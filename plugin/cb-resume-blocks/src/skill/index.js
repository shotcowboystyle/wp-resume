import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import metadata from './block.json';
import './style.css';

const yearsText = ( years, max ) => `${ years }${ years >= max ? '+' : '' }`;

registerBlockType( metadata.name, {
	edit: function Edit( { attributes, setAttributes } ) {
		const { label, years, since, display, max } = attributes;
		const blockProps = useBlockProps( {
			className: `is-${ display }`,
			style: { '--value': Math.min( years / max, 1 ) },
		} );
		const labelField = (
			<RichText
				tagName="span"
				value={ label }
				onChange={ ( value ) => setAttributes( { label: value } ) }
				placeholder={ __( 'Skill', 'cb-resume-blocks' ) }
				allowedFormats={ [] }
			/>
		);
		const meta = `${ yearsText( years, max ) } yrs${ since ? ` · since ${ since }` : '' }`;

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Chart', 'cb-resume-blocks' ) }>
						<SelectControl
							label={ __( 'Display', 'cb-resume-blocks' ) }
							value={ display }
							options={ [
								{ label: 'Bar', value: 'bar' },
								{ label: 'Ring', value: 'ring' },
							] }
							onChange={ ( value ) =>
								setAttributes( { display: value } )
							}
						/>
						<RangeControl
							label={ __(
								'Years of hands-on use',
								'cb-resume-blocks'
							) }
							value={ years }
							min={ 0 }
							max={ max }
							onChange={ ( value ) =>
								setAttributes( { years: value ?? 0 } )
							}
						/>
						<TextControl
							type="number"
							label={ __(
								'First used (year)',
								'cb-resume-blocks'
							) }
							value={ since ?? '' }
							onChange={ ( value ) =>
								setAttributes( {
									since: value ? Number( value ) : undefined,
								} )
							}
						/>
						<RangeControl
							label={ __(
								'Scale maximum (years)',
								'cb-resume-blocks'
							) }
							value={ max }
							min={ 5 }
							max={ 30 }
							onChange={ ( value ) =>
								setAttributes( { max: value ?? 20 } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					{ display === 'ring' ? (
						<>
							<div
								className="wp-block-cb-skill__ring"
								aria-hidden="true"
							>
								<span className="wp-block-cb-skill__num">
									{ yearsText( years, max ) }
								</span>
							</div>
							<p className="wp-block-cb-skill__label">
								{ labelField }
							</p>
							<p className="wp-block-cb-skill__meta">{ meta }</p>
						</>
					) : (
						<>
							<p className="wp-block-cb-skill__label">
								{ labelField }
								<span className="wp-block-cb-skill__meta">
									{ meta }
								</span>
							</p>
							<div
								className="wp-block-cb-skill__track"
								aria-hidden="true"
							>
								<span className="wp-block-cb-skill__fill" />
							</div>
						</>
					) }
				</div>
			</>
		);
	},
	save: () => null,
} );
