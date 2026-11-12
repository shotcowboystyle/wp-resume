import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import metadata from './block.json';
import './style.css';

registerBlockType( metadata.name, {
	edit: function Edit() {
		const props = useInnerBlocksProps( useBlockProps(), {
			template: [ [ 'cb/timeline-item' ] ],
		} );
		return <ol { ...props } />;
	},
	save: () => <InnerBlocks.Content />,
} );
