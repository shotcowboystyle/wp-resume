import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import metadata from './block.json';

const field = (
	attributes,
	setAttributes,
	key,
	tag,
	className,
	placeholder
) => (
	<RichText
		tagName={ tag }
		className={ className }
		value={ attributes[ key ] }
		onChange={ ( value ) => setAttributes( { [ key ]: value } ) }
		placeholder={ placeholder }
		allowedFormats={ [] }
	/>
);

registerBlockType( metadata.name, {
	edit: function Edit( { attributes, setAttributes } ) {
		const blockProps = useBlockProps();
		const innerProps = useInnerBlocksProps(
			{ className: 'wp-block-cb-timeline-item__details' },
			{ template: [ [ 'core/list' ] ] }
		);
		const f = ( ...args ) => field( attributes, setAttributes, ...args );
		return (
			<li { ...blockProps }>
				<div className="wp-block-cb-timeline-item__date">
					{ f(
						'start',
						'span',
						'',
						__( 'Start', 'cb-resume-blocks' )
					) }{ ' ' }
					–{ ' ' }
					{ f( 'end', 'span', '', __( 'End', 'cb-resume-blocks' ) ) }
				</div>
				<div className="wp-block-cb-timeline-item__body">
					{ f(
						'title',
						'h3',
						'wp-block-cb-timeline-item__title',
						__( 'Role or project', 'cb-resume-blocks' )
					) }
					{ f(
						'org',
						'p',
						'wp-block-cb-timeline-item__org',
						__( 'Organization', 'cb-resume-blocks' )
					) }
					<div { ...innerProps } />
				</div>
			</li>
		);
	},
	save: () => <InnerBlocks.Content />,
} );
