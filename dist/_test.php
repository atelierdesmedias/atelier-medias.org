<?php require ("config.php") ?>

<!DOCTYPE HTML>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="IE=Edge"/>
    <meta http-equiv="imagetoolbar" content="no"/>

    <?php if ($ENV === 'production') : ?>
    <!--

    __        ___ _ _         ____
    \ \      / (_) | |_   _  | __ ) _ __ __ _ _   _ _ __   ___ _ __
     \ \ /\ / /| | | | | | | |  _ \| '__/ _` | | | | '_ \ / _ \ '__|
      \ V  V / | | | | |_| | | |_) | | | (_| | |_| | | | |  __/ |
       \_/\_/  |_|_|_|\__, | |____/|_|  \__,_|\__,_|_| |_|\___|_|
                      |___/

    Hi !
    Check my work - willybrauner.com
    contact me - mail@willybrauner.com

    -->
    <?php endif; ?>

    <!-- META -->
    <title></title>
    <meta name="description" content=""/>
    <meta name="keywords" content=""/>

    <!-- LAYOUT -->
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width" />

    <!-- META Facebook -->
    <meta property="og:title" content="">
    <meta property="og:site_name" content="">
    <meta property="og:description" content="">
    <meta property="og:image" content="">
    <meta property="og:type" content="website">

    <!-- META Twitter -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="">
    <meta name="twitter:site" content="">
    <meta name="twitter:description" content="">
    <meta name="twitter:url" content="">
    <meta name="twitter:image" content="">

    <!-- META Google plus -->
    <meta itemprop="name" content="">
    <meta itemprop="description" content="">
    <meta itemprop="image" content="">

    <!-- META Image site preview social general -->
    <link rel="image_src" href="">

    <!-- FAVICON -->

    <!-- STYLES -->

    <?php // load bundle css depend of environment ?>
    <?php if ($ENV === 'production') : ?>
        <link rel="stylesheet" href="<?php echo $CURRENT_ENV_URL . 'assets/css/bundle-main.css?'. date("YmdHis") ?>">
    <?php endif ?>

</head>

<!-- START DOM -->
<body>
    <?php // start application ?>
    <div id="AppContainer"></div>
    
    <?php // load bundle js ?>
    <script type="text/javascript" src="<?php echo $CURRENT_ENV_URL . 'assets/bundle-main.js?'. date("YmdHis") ?>"></script>
</body>
</html>


