import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-github";


export default function CodeEditor({sourceCode, setSourceCode, setupData, theme}) {
	const classes = useStyles();
	const defaultText = setupData.defaultText;
	useEffect(() => {
		setSourceCode(defaultText);
	}, [defaultText, setSourceCode])

	return (
		<AceEditor
			mode="javascript"
			className={classes.editor}
			theme={theme}
			onChange={setSourceCode}
			fontSize={14}
			value={sourceCode}
			showPrintMargin={false}
		/>
	);
}

const useStyles = makeStyles({
	editor: {
		flex: 1,
		height: '100vh !important',
		width: '100% !important',
	}
});
