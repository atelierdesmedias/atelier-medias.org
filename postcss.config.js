module.exports  = ({ file, options, env }) => ({
    plugins: {
        'postcss-import': {},

        'postcss-cssnext': {
            browsers: ['last 5 versions', '> 100%']
        },

        'postcss-preset-env':
            options['postcss-preset-env']
                ? options['postcss-preset-env']
                : false,

        'cssnano': env === 'production'
            ? options.cssnano
            : false
    },
});
