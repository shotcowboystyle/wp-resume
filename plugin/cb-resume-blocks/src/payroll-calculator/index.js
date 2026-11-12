import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';
import './style.css';

const FIELDS = [
	[ 'salary', __( 'Default salary', 'cb-resume-blocks' ) ],
	[ 'employees', __( 'Default employees', 'cb-resume-blocks' ) ],
	[ 'sutaRate', __( 'Default SUTA rate (%)', 'cb-resume-blocks' ) ],
	[ 'sutaWageBase', __( 'Default SUTA wage base', 'cb-resume-blocks' ) ],
];

registerBlockType( metadata.name, {
	edit: function Edit( { attributes, setAttributes } ) {
		return (
			<>
				<InspectorControls>
					<PanelBody
						title={ __( 'Starting values', 'cb-resume-blocks' ) }
					>
						{ FIELDS.map( ( [ key, label ] ) => (
							<TextControl
								key={ key }
								type="number"
								label={ label }
								value={ attributes[ key ] }
								onChange={ ( value ) =>
									setAttributes( {
										[ key ]: Number( value ),
									} )
								}
							/>
						) ) }
					</PanelBody>
				</InspectorControls>
				<div { ...useBlockProps() }>
					<ServerSideRender
						block={ metadata.name }
						attributes={ attributes }
					/>
				</div>
			</>
		);
	},
	save: () => null,
} );
