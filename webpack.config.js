const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devServer = (isDev) => (!isDev ? {} : {
  devServer: {
    open: ['/index.html'],
    hot: true,
    port: 7777,
    watchFiles: ['src']
  }
});

const filenameJs = (isDev, file, ext) => `[name].${file}.${isDev ? 'dev' : '[contenthash]'}.${ext}`;
const filenameCss = (isDev, file, ext) => `${file}.${isDev ? 'dev' : '[contenthash]'}.${ext}`;

// <include src="path-to-html.html"/>
const processNestedHtml = (content, loaderContext, resourcePath = '') => {
  let fileDir = resourcePath === ''
    ? path.dirname(loaderContext.resourcePath)
    : path.dirname(resourcePath);
  const INCLUDE_PATTERN = /<include-part src="(\.\/)?(.+)"\/?>(?:<\/include>)?/gi;

  function replaceHtml(match, pathRule, src) {
    if (pathRule === './') {
      fileDir = loaderContext.context;
    }
    const filePath = path.resolve(fileDir, src);
    loaderContext.dependency(filePath);
    const html = fs.readFileSync(filePath, 'utf8');
    return processNestedHtml(html, loaderContext, filePath);
  }

  if (!INCLUDE_PATTERN.test(content)) {
    return content;
  }
  return content.replace(INCLUDE_PATTERN, replaceHtml);
};

const processHtmlLoader = (content, loaderContext) => {
  const newContent = processNestedHtml(content, loaderContext);
  return newContent;
};

const pages = [
  'index',
  'game',
  'results',
  'gallery'
];

const pagesScripts = {};
const pagesTemplates = [];

pages.forEach((page) => {
  pagesScripts[page] = `./src/js/${page}.js`;
  const pageTemplate = new HtmlWebpackPlugin({
    inject: 'body',
    template: `./src/html/${page}.html`,
    filename: `${page}.html`,
    chunks: [`${page}`]
  });
  pagesTemplates.push(pageTemplate);
});

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: pagesScripts,
  output: {
    filename: filenameJs(development, 'bundle', 'js'),
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[base]'
  },
  plugins: [
    ...pagesTemplates,
    new MiniCssExtractPlugin({
      filename: filenameCss(development, 'style', 'css')
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/static/birds'),
          to: path.resolve(__dirname, 'dist/assets/')
        },
        {
          from: path.resolve(__dirname, 'src/assets/static/birds-bg'),
          to: path.resolve(__dirname, 'dist/assets/')
        },
        {
          from: path.resolve(__dirname, 'src/assets/audio'),
          to: path.resolve(__dirname, 'dist/assets/')
        },
        {
          from: path.resolve(__dirname, 'src/md/self-test.md'),
          to: path.resolve(__dirname, 'dist/')
        },
        {
          from: path.resolve(__dirname, 'src/assets/img/bird-logo.png'),
          to: path.resolve(__dirname, 'dist/assets/')
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(html)$/i,
        use: {
          loader: 'html-loader',
          options: {
            preprocessor: processHtmlLoader
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: !development,
    minimizer: [
      new TerserPlugin({
        test: /\.js$/i
      }),
      new CssMinimizerPlugin({
        test: /\.css$/i,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ]
  },
  ...devServer(development)
});
