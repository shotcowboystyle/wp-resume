import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';
import './style.css';

registerBlockType( metadata.name, {
	edit: function Edit( { attributes, setAttributes } ) {
		const field = ( key, tag, className, placeholder ) => (
			<RichText
				tagName={ tag }
				className={ className }
				value={ attributes[ key ] }
				onChange={ ( value ) => setAttributes( { [ key ]: value } ) }
				placeholder={ placeholder }
				allowedFormats={ [] }
			/>
		);
		return (
			<figure { ...useBlockProps() }>
				{ field( 'value', 'p', 'wp-block-cb-metric__value', '2×' ) }
				<figcaption>
					{ field(
						'label',
						'span',
						'wp-block-cb-metric__label',
						__( 'What changed', 'cb-resume-blocks' )
					) }
					<span className="wp-block-cb-metric__source">
						{ field(
							'source',
							'span',
							'',
							__( 'Source', 'cb-resume-blocks' )
						) }
						{ ' · ' }
						{ field(
							'asOf',
							'span',
							'',
							__( 'As of', 'cb-resume-blocks' )
						) }
					</span>
				</figcaption>
			</figure>
		);
	},
	save: () => null,
} );
