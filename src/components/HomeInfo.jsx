import { arrow } from "../assets/icons";
import React from "react"
import { Link } from "react-router-dom";

const InfoBox = ({ text, link, btnText }) => (
    <div className="info-box">
        <p className="font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn" >
            {btnText}
            <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
    </div>
);

const renderContent = {
    1: (
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5" >
            Hi, I am <span className="font-semibold mx-2 text-white">Robert Bagwell</span> 👋 <br />
            A Software Engineer
        </h1>
    ),
    2: (
        <h1>
            <InfoBox
                text={"Worked with many companies and picked up many skills along the way"}
                link={"/about"}
                tnText={"Learn more"}
            />
        </h1>
    ),
    3: (
        <h1>
            <InfoBox
                text={"Led multiple projects to success over the years. Curious about the impact?"}
                link={"/projects"}
                tnText={"Visit my portfolio."}
            />
        </h1>
    ),
    4: (
        <h1>
            <InfoBox
                text={"Need a project done or looking for a dev? I'm just a few keystrokes away"}
                link={"/contacts"}
                tnText={"Let's talk"}
            />
        </h1>
    )
}

const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null;
}

export default HomeInfo