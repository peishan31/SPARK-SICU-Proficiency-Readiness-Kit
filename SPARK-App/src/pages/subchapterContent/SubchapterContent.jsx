import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import "./subchapterContent.css";
import { Tooltip } from '@mui/material';

const SubchapterContent = () => {
    return (
        <div className="subchapterContent">
            <div className="subchapterContentContainer">
            <ArrowBackIcon className="backButton"/>
                <div className="subchapterContentTop">
                    <img className="headerImage" src="../../../public/assets/subchapters/barbituratecoma.jpg" alt="coma"/>
                    <div className="subchapterIcon">
                            🧠
                    </div>
                    <div className="subchapterActions">
                        <div className="subchapterAction">
                            <Tooltip title="Edit" placement="top">
                                <EditIcon className="subchapterActionIcon"/>
                            </Tooltip>
                        </div>
                        <div className="subchapterAction">
                            <Tooltip title="Bookmark" placement="top">
                                <BookmarkBorderIcon className="subchapterActionIcon"/>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="subchapterText">
                        <h1 className="subchapterTitle">
                            Barbiturate Coma Protocol
                        </h1>
                        <div className="subchapterCategory">
                            NEUROLOGY/TRAUMA
                        </div>
                        <div className="subchapterDescription">
                            A guide on how to manage Barbiturate Comas.
                        </div>
                    </div>
                </div>
                <div className="subchapterContentBottom">
                    <div className="subchapterContentBody">
                        <h2>🔍 Indications</h2>
                        <p>Haemodynamically stable <b>and</b> <br/>

                        1. Salvageable severe head injury with <br/>

                        2. Intracranial hypertension <br/>

                        3. Refractory to maximal medical and surgical intra-cranial pressure lowering therapies.</p>
                        <br/>
                        <br/>
                        <h2>👨‍🔬 Initiation and Titration</h2>
                        <ul>
                            <li>
                                Dilute thiopentone to 25mg/ml by adding 20ml of sterile water to each 500 mg bottle of thiopentone
                            </li>
                            <li>
                                Loading dose: Give an initial bolus of 250 mg over 10-20 min. This may be repeated up to a total load dose of 500-1000 mg, according to ICP response or attainment of burst suppression on the EEG tracing.
                            </li>
                            <li>
                                Maintenance dose: 125-500 mg/hr titrated to ICP control or maintenance of burst suppression EEG
                            </li>
                            <li>
                                Stop Morphine and other sedation
                            </li>
                            <br/>
                        </ul>
                        <p>Once ICP control has been achieved for 24-36 hrs, the thiopentone infusion may be reduced gradually and stopped. Monitor for rebound in the ICP, which may require restarting the thiopentone infusion.</p>
                        <br/>
                        <br/>
                        <h2>🙅‍♀️ Complications</h2>
                        <ol>
                            <li>Hypokalemia during induction of barbituate coma: Check UECr Q6H</li>
                            <li>Hypokalemia during induction of barbituate coma: Check UECr Q6H</li>
                            <li>Hypokalemia during induction of barbituate coma: Check UECr Q6H</li>
                            <li>Hypokalemia during induction of barbituate coma: Check UECr Q6H</li>
                            <li>Hypokalemia during induction of barbituate coma: Check UECr Q6H</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubchapterContent;
