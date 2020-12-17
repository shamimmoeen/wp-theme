<?php
/**
 * Child theme functions.
 *
 * @package wptheme
 */

add_action( 'wp_enqueue_scripts', 'wp_theme_load_styles' );

/**
 * Load the scripts.
 */
function wp_theme_load_styles() {
	wp_enqueue_style(
		'wp-theme-child-style',
		get_stylesheet_uri(),
		array( 'twenty-twenty-one-style' ),
		wp_get_theme()->get( 'Version' ) // This only works if you have Version in the style header.
	);

	wp_enqueue_style(
		'wp-theme-styles',
		get_stylesheet_directory_uri() . '/assets/build/wp-theme-styles.css',
		array(),
		filemtime( get_stylesheet_directory() . '/assets/build/wp-theme-styles.css' )
	);

	wp_enqueue_script(
		'wp-theme-scripts',
		get_stylesheet_directory_uri() . '/assets/build/wp-theme-scripts.js',
		array( 'jquery' ),
		filemtime( get_stylesheet_directory() . '/assets/build/wp-theme-scripts.js' ),
		true
	);
}
