/**
 * Note : property "version" is injected from package.json
 */

module.exports = {

    /**
     * Les propriété par défaut du dotEnv.
     * A overrider dans votre env.
     */
    dotEnv: {

        WP_ENV:'local',
        WP_DEBUG: 'true',
        WP_THEME:'adm',
        WP_PREFIX:'wpl_',

        DB_HOST:'localhost',
        DB_NAME:'admwp',
        DB_USER:'root',
        DB_PASSWORD:'',

        MAIL_HOST:'smtp.mailtrap.io',
        MAIL_PORT:'2525',
        MAIL_USERNAME:'null',
        MAIL_PASSWORD:'null',
        MAIL_ENCRYPTION:'null',

        // Generate your keys here: https://wordplate.github.io/salt/
        AUTH_KEY:'efafd3767047ad48536256eb20d1c2864788bbb48111163404379197ca0acd59',
        SECURE_AUTH_KEY:'26357bb755d2582b61576e361e504345b7e10904d169ee341047650f8a4e22da',
        LOGGED_IN_KEY:'2afaabeff155ef0f9efa9f00c3b5ab07c04e913f80593367fcf33449fd2128c2',
        NONCE_KEY:'06500a5c4d681a0e15900bb378b5c70283fe1a843f0126471b5d1e396192c322',
        AUTH_SALT:'48e23b5c9e1b3444cc17a7366e2b119b04625c948e95a87ae229b7a31a768224',
        SECURE_AUTH_SALT:'c6f98d60587925c9f0942b81f4e8ae1a59a591bff6d2da0476a6ef4847fae42f',
        LOGGED_IN_SALT:'1a5de221c54a55a9512bf26165644e998237e076cb9c4edc87befb8e90baf040',
        NONCE_SALT:'a0e3bb864aaa5f1e00bc9ad9aaa4328118ac66922f7494937487828b367720cb',

        DISALLOW_FILE_EDIT: true,
        SAVEQUERIES: true,
        FS_METHOD: 'direct',
        // ACF_PRO_KEY: 'b3JkZXJfaWQ9MzI4MjZ8dHlwZT1wZXJzb25hbHxkYXRlPTIwMTQtMDctMDcgMTU6MDI6MDE=',

    }
};
