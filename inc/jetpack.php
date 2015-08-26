<?php
/**
 * Jetpack Compatibility File
 * See: https://jetpack.me/
 *
 * @package Gulp Demo Theme
 */

/**
 * Add theme support for Infinite Scroll.
 * See: https://jetpack.me/support/infinite-scroll/
 */
function gulp_demo_theme_jetpack_setup() {
	add_theme_support( 'infinite-scroll', array(
		'container' => 'main',
		'render'    => 'gulp_demo_theme_infinite_scroll_render',
		'footer'    => 'page',
	) );
} // end function gulp_demo_theme_jetpack_setup
add_action( 'after_setup_theme', 'gulp_demo_theme_jetpack_setup' );

/**
 * Custom render function for Infinite Scroll.
 */
function gulp_demo_theme_infinite_scroll_render() {
	while ( have_posts() ) {
		the_post();
		get_template_part( 'template-parts/content', get_post_format() );
	}
} // end function gulp_demo_theme_infinite_scroll_render
