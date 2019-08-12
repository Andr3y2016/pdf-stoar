<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://ad620465.000webhostapp.com
 * @since             1.0.0
 * @package           Pdf_Stoar
 *
 * @wordpress-plugin
 * Plugin Name:       pdf storage
 * Plugin URI:        http://ad620465.000webhostapp.com
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Andrey
 * Author URI:        http://ad620465.000webhostapp.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       pdf-stoar
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PDF_STOAR_VERSION', '1.0.0' );

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Pdf_Stoar
 * @subpackage Pdf_Stoar/includes
 * @author     Andrey <ad620465@gmail.com>
 */

class Pdf_Stoar {
		public function __construct() {
			add_filter ("the_content", array( $this, 'render_public_ui' ));
		}

		public function render_public_ui ($Content) {
				$Uihwd = '[pdf_storage_ui_hwd]';
				// $UiContent = 'this is the ui for pdf_storage';				
			    $path='/wp-content/plugins/pdf-stoar/uploder.php';
			    $UiContent = 
						    '<form enctype="multipart/form-data" action="'.$path.'" method="POST">'.
							    'Отправить этот файл: <input name="userfile" type="file" />'.
							    '<input type="submit" value="Отправить файл" />'.
							'</form>';
				$Content =  str_replace($Uihwd, $UiContent, $Content);

				return $Content;
		}
}

new Pdf_Stoar();
