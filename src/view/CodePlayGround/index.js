import React, { useState, useEffect } from 'react'
import FlipIcon from '@material-ui/icons/Flip';
import GetAppIcon from '@material-ui/icons/GetApp';
import fileDownload from 'js-file-download';
import { Menu as MenuIcon } from 'react-feather';

import useWindowDimensions from '../../hooks/useWindowDimensions'
import AceEditor from "../../components/AceEditor";
import * as MUI from '../../assets/MUICore'
import './CodePlayGround.css'
import setupData from './editorSetupData.json';

export default function CodePlayGround() {
    const { width } = useWindowDimensions();
    const [sourceCode, setSourceCode] = useState('')
    const [theme, setTheme] = useState("solarized_dark")
    const [selectedLanguage, setSelectedLanguage] = useState(setupData[0])
    const [output, setOutput] = useState(selectedLanguage.defaultText)
    const [isDanelDirectionLeftRight, setIsDanelDirectionLeftRight] = useState(false)
    
	useEffect(() => {
        setOutput(selectedLanguage.defaultText)
        setSourceCode(selectedLanguage.defaultText)
	}, [selectedLanguage])

	useEffect(() => {
        if(width < 700) { setIsDanelDirectionLeftRight(false); }
        else { setIsDanelDirectionLeftRight(true); }
	}, [width, setIsDanelDirectionLeftRight])

    const downloadFile = () => {
        fileDownload(sourceCode, `codePlayGround.${selectedLanguage.extension}`);
    }

    const onLanguageChange = (selectedLang) => {
        setSelectedLanguage(setupData.find(data => data.language === selectedLang.target.value))
    }

    const menuItems = setupData.map(data => <MUI.MenuItem key={data.id} value={data.language} name={data.language}>{data.language}</MUI.MenuItem>)

    const selectLanguage = 
        <MUI.FormControl variant="outlined">
            <MUI.Select
            value={selectedLanguage.language}
            onChange={onLanguageChange}
            className="languageDropdwon"
            >
                {menuItems}
            </MUI.Select>
        </MUI.FormControl>

    const selectTheme = 
        <MUI.FormControl variant="outlined">
            <MUI.Select
            value={theme}
            onChange={(data)=>setTheme(data.target.value)}
            className="languageDropdwon"
            >
                <MUI.MenuItem value="solarized_dark">Solarized Dark</MUI.MenuItem>
                <MUI.MenuItem value="github">Github</MUI.MenuItem>
            </MUI.Select>
        </MUI.FormControl>

    const appBar = 
        <MUI.AppBar position="static" className="appbar">
            <MUI.Toolbar>
                <MUI.Grid container>
                <MUI.Grid item xs={6}>
                    <div className="titleContent">
                        <MUI.Hidden lgUp>
                        <MUI.IconButton color="inherit">
                            <MUI.SvgIcon fontSize="small">
                            <MenuIcon />
                            </MUI.SvgIcon>
                        </MUI.IconButton>
                        </MUI.Hidden>
                        <MUI.Typography variant="h6">
                            Code Play Ground
                        </MUI.Typography>
                        <MUI.Hidden mdDown>
                            {selectLanguage}
                            {selectTheme}
                            <FlipIcon onClick={()=>setIsDanelDirectionLeftRight(!isDanelDirectionLeftRight)} className="menuIcon" />
                            <GetAppIcon className="menuIcon" onClick={downloadFile}/>
                        </MUI.Hidden>
                    </div>
                </MUI.Grid>
                <MUI.Grid item xs={6}>
                    <div className='run'>
                        <MUI.Button
                        onClick={()=>setOutput(sourceCode)}
                        className='runButton' variant="contained" color="secondary">Run Code</MUI.Button>
                    </div>
                </MUI.Grid>
                </MUI.Grid>
            </MUI.Toolbar>
        </MUI.AppBar>

    const editor = 
        <AceEditor 
            sourceCode={sourceCode} 
            setSourceCode={setSourceCode} 
            downloadFile={downloadFile}
            setupData={setupData[0]}
            theme={theme}
        />
        
    const iFrame = 
        <iframe
            srcDoc={output}
            title="codeEditor"
            className='outputPanel'
        /> 

    return (
        <>
            {appBar}
            <div className={`container ${isDanelDirectionLeftRight ? 'leftRight' : 'topBottom'}`}>
                {editor}
                {iFrame}
            </div>
        </>
    )
}
