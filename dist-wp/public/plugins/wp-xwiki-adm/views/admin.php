<div class="wrap">
    <h2>XWiki ADM options</h2>

    <form method="POST">
        <input type="hidden" name="option_page" value="wp-xwiki-adm">

        <table class="form-table">
            <tbody>
                <!-- End-point -->
                <tr>
                    <th>
                        <label for="endpoint">Addresse Intranet XWiki</label>
                    </th>
                    <td>
                        <input id="endpoint" class="regular-text" type="text" name="xwiki_adm_endpoint"
                               value="<?php $o('xwiki_adm_endpoint'); ?>">
                    </td>
                </tr>
                <!-- User-->
                <tr>
                    <th>
                        <label for="endpoint">Utilisateur compte de service</label>
                    </th>
                    <td>
                        <input id="endpoint" class="regular-text" type="text" name="xwiki_adm_user"
                               value="<?php $o('xwiki_adm_user'); ?>">
                    </td>
                </tr>
                <!-- Password-->
                <tr>
                    <th>
                        <label for="endpoint">Mot de passe compte de service</label>
                    </th>
                    <td>
                        <input id="endpoint" class="regular-text" type="password" name="xwiki_adm_pass"
                               value="<?php $o('xwiki_adm_pass'); ?>">
                    </td>
                </tr>
            </tbody>
        </table>

        <p class="submit">
            <input class="button button-primary" type="submit" value="Enregistrer les modifications">
        </p>
    </form>
</div>