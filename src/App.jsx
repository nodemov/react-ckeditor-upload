import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Alignment,
	AutoImage,
	Autosave,
	Bold,
	Essentials,
	GeneralHtmlSupport,
	Heading,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	Paragraph,
	RemoveFormat,
	SimpleUploadAdapter,
	SourceEditing,
	SpecialCharacters,
	TodoList,
	Underline,
	WordCount
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import './App.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

export default function App() {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const editorWordCountRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { editorConfig } = useMemo(() => {
		if (!isLayoutReady) {
			return {};
		}

		const uploadEndpoint = 'http://xxxxxxx.test/ckeditor/upload';

		function uploadAdapter(loader) {
			return {
				upload: () => {
					return new Promise((resolve, reject) => {
						const body = new FormData();
						loader.file.then((file) => {
							body.append('image', file);
							fetch(`${uploadEndpoint}`, {
								method: 'POST',
								body: body,
							})
								.then(response => response.json())
								.then(data => {
									console.log('my res', data.url);
									resolve({ default: `${data.url}` });
								})
								.catch(error => {
									console.log(error);
									reject(error);
								});
						})
					})
				}
			}
		}

		function uploadPlugin(editor) {
			editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
				return new uploadAdapter(loader)
			}
		}

		return {
			editorConfig: {
				toolbar: {
					items: [
						'sourceEditing',
						'|',
						'heading',
						'|',
						'bold',
						'italic',
						'underline',
						'removeFormat',
						'|',
						'specialCharacters',
						'link',
						'insertImage',
						'|',
						'alignment',
						'|',
						'bulletedList',
						'numberedList',
						'todoList'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Alignment,
					AutoImage,
					Autosave,
					Bold,
					Essentials,
					GeneralHtmlSupport,
					Heading,
					ImageBlock,
					ImageCaption,
					ImageInline,
					ImageInsert,
					ImageInsertViaUrl,
					ImageResize,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					Italic,
					Link,
					LinkImage,
					List,
					ListProperties,
					Paragraph,
					RemoveFormat,
					SimpleUploadAdapter,
					SourceEditing,
					SpecialCharacters,
					TodoList,
					Underline,
					WordCount
				],
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				htmlSupport: {
					allow: [
						{
							name: /^.*$/,
							styles: true,
							attributes: true,
							classes: true
						}
					]
				},
				image: {
					toolbar: [
						'toggleImageCaption',
						'imageTextAlternative',
						'|',
						'imageStyle:inline',
						'imageStyle:wrapText',
						'imageStyle:breakText',
						'|',
						'resizeImage'
					]
				},
				initialData:
					'<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor\'s\n\t\tconfiguration to match your application\'s style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don\'t hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n\t<li>📝 <a href="https://portal.ckeditor.com/checkout?plan=free">Trial sign up</a>,</li>\n\t<li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n\t<li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n\t<li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n\t<li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser\'s\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n',
				licenseKey: LICENSE_KEY,
				extraPlugins: [uploadPlugin],
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				list: {
					properties: {
						styles: true,
						startIndex: true,
						reversed: true
					}
				},
				placeholder: 'Type or paste your content here!'
			}
		};
	}, [isLayoutReady]);

	return (
		<div className="main-container">
			<div className="editor-container editor-container_classic-editor editor-container_include-word-count" ref={editorContainerRef}>
				<div className="editor-container__editor">
					<div ref={editorRef}>
						{editorConfig && (
							<CKEditor
								onReady={editor => {
									const wordCount = editor.plugins.get('WordCount');
									editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
								}}
								onAfterDestroy={() => {
									Array.from(editorWordCountRef.current.children).forEach(child => child.remove());
								}}
								editor={ClassicEditor}
								config={editorConfig}
							/>
						)}
					</div>
				</div>
				<div className="editor_container__word-count" ref={editorWordCountRef}></div>
			</div>
		</div>
	);
}
