<div class="wrap">
    <h2>Synchroniser avec l'Intranet</h2>

    <?php if (!$connection_valid) { ?>
        <div class="error settings-error">
            <p><strong>La connection avec l'Intranet XWiki ADM n'est pas configurée correctement.
                    Vérifiez les informations dans "Réglages -> XWiki / ADM"</strong></p>
        </div>
    <?php } else { ?>

    <form method="POST">
        <input type="hidden" name="action" value="sync_coworkers">

        <?php if ((count($coworkers) > 0)) { ?>
        <table class="wp-list-table widefat fixed">
            <thead>
                <tr>
                    <th class="manage-column column-title">Nom</th>
                    <th class="manage-column column-title">Formule OK ?</th>
                    <th class="manage-column column-title">Public OK?</th>
                    <th class="manage-column column-title">Profil public</th>
                    <th class="manage-column column-title">Dernière synchro</th>
                    <th class="manage-column column-title">MAJ Profil</th>
                    <th class="manage-column column-title">À jour (avant synchro)</th>
                    <th class="manage-column column-title">Sync action</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach($coworkers as $coworker): ?>
            <tr>
                <td><?php echo $coworker['first_name'] . ' ' . $coworker['last_name'] ?></td>
                <td><?php echo ($coworker['formule'] == "fixe" || $coworker['formule'] == "nomade") ? "Oui" : "Non" ?></td>
                <td><?php echo $coworker['public_enable'] ? "Oui" : "Non" ?></td>
                <td>
                    <?php if ($coworker['_post_slug']) { ?>
                        <a target="_blank" href="<?php echo $coworker['_post_link'] ?>"><?php echo $coworker['_post_slug'] ?></a>
                    <?php } ?>
                </td>
                <td>
                    <?php if ($coworker['_post_modified']) { ?>
                        <?php echo $coworker['_post_modified'] ?>
                    <?php } ?>
                </td>
                <td><?php echo $coworker['update_date'] ?></td>
                <td>
                    <?php if ($coworker['_post_modified'] && $coworker['_sync_action'] != 'created') { ?>
                        <?php echo $coworker['_is_up_to_date'] ? "Oui" : "Non" ?>
                    <?php } ?>
                </td>
                <td>
                    <?php if ($coworker['_sync_action']) { ?>
                        <?php echo $coworker['_sync_action'] ?>
                    <?php } ?>
                </td>
            </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        <?php } ?>

        <p class="submit">
            <input class="button button-primary" type="submit" value="Synchroniser (cela peut prendre un peu de temps)">
        </p>
    </form>

    <?php } ?>

</div>
