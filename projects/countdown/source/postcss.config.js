import postcssPresetEnv from 'postcss-preset-env';
import atImport from 'postcss-import';
import postcssNested from 'postcss-nested';

export default {
  plugins: [
    // cssnano(),
    atImport(),
    postcssNested(),
    postcssPresetEnv({stage: 1}),
  ],
};
