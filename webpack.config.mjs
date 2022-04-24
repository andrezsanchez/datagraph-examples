import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
const __dirname = path.resolve();

export default {
  entry: './graphics/index.ts',

  mode: 'development',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [new HtmlWebpackPlugin()],
};
