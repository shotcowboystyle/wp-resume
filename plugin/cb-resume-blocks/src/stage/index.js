import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';
import './style.css';

registerBlockType( metadata.name, {
	edit: function Edit( { attributes, setAttributes } ) {
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Scene', 'cb-resume-blocks' ) }>
						<SelectControl
							label={ __( 'Scene', 'cb-resume-blocks' ) }
							value={ attributes.scene }
							options={ metadata.attributes.scene.enum.map(
								( value ) => ( { value, label: value } )
							) }
							onChange={ ( scene ) => setAttributes( { scene } ) }
						/>
						<TextControl
							label={ __(
								'Description for screen readers',
								'cb-resume-blocks'
							) }
							value={ attributes.label }
							onChange={ ( label ) => setAttributes( { label } ) }
						/>
						<ToggleControl
							label={ __(
								'Above the fold (load poster first)',
								'cb-resume-blocks'
							) }
							checked={ attributes.priority }
							onChange={ ( priority ) =>
								setAttributes( { priority } )
							}
						/>
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
