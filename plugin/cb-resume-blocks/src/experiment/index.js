import { registerBlockType } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';
import metadata from './block.json';
import './editor.css';

const variant = ( name ) => [
	'core/group',
	{ metadata: { name }, className: 'cb-experiment__variant' },
	[ [ 'core/paragraph', { placeholder: name } ] ],
];

registerBlockType( metadata.name, {
	edit: function Edit( { attributes, setAttributes } ) {
		const { experimentId, split } = attributes;
		const blockProps = useBlockProps();
		const innerProps = useInnerBlocksProps(
			{ className: 'cb-experiment__variants' },
			{
				template: [ variant( 'Variant A' ), variant( 'Variant B' ) ],
				templateLock: 'insert',
			}
		);
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Experiment', 'cb-resume-blocks' ) }>
						<TextControl
							label={ __(
								'Experiment ID (event + cookie key)',
								'cb-resume-blocks'
							) }
							value={ experimentId }
							onChange={ ( value ) =>
								setAttributes( {
									experimentId: value
										.replace( /[^a-z0-9-]/gi, '-' )
										.toLowerCase(),
								} )
							}
						/>
						<RangeControl
							label={ __(
								'Traffic to Variant B (%)',
								'cb-resume-blocks'
							) }
							value={ split }
							min={ 0 }
							max={ 100 }
							onChange={ ( value ) =>
								setAttributes( { split: value ?? 50 } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					<p className="cb-experiment__badge">
						{ sprintf(
							/* translators: 1: experiment id, 2: percent to A, 3: percent to B */
							__(
								'A/B test “%1$s”: A %2$d%% / B %3$d%%. Visitors see one variant.',
								'cb-resume-blocks'
							),
							experimentId,
							100 - split,
							split
						) }
					</p>
					<div { ...innerProps } />
				</div>
			</>
		);
	},
	save: () => <InnerBlocks.Content />,
} );
