
"use client";
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";
import { useState } from "react";
import React from "react";
// import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/20/solid";
interface ResumeProps {
  resumeData: {
    profileImg: string;
    phone: string;
    email: string;
    location: string;
    education: string[];
    skills: string[];
    languages: string[];
    name: string;
    profession: string;
    professionalSummary: string;
    expertise: string;
    jobExperience: string[];
    filename: string;
  };
}

const ResumePreview: React.FC<ResumeProps> = ({ resumeData }) => {
  const [filename, setFilename] = useState<string>(resumeData.filename);

  // Handle filename input change
  const handleFilenameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.value);
  };

  // Generate a unique shareable link based on the filename
  const generateUniqueLink = () => {
    const baseUrl = "https://dynamic-resume-builder.vercel.app/resume"; // Change this to your actual domain or route
    const uniqueLink = `${baseUrl}?filename=${encodeURIComponent(resumeData.filename)}`;
    return uniqueLink;
  };


  const [isVisible, setIsVisible] = useState<boolean>(true);
  const generatePDF = () => {
    const element = document.getElementById("resume-content");
    const filename = resumeData.filename || 'reume.pdf';
    const options = {
      filename: `${filename}.pdf`,
      html2canvas: { scale:4 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };
  const toggleVisibility = ()=>{
      setIsVisible(!isVisible);
  };

  return (
    <div>
      <div id="resume-content" className="min-h-screen flex items-center justify-center py-4  sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="w-full md:w-1/3 p-6 text-white bg-[#163853]">
            {/* Image and Contact Information */}
            <div className="flex items-center justify-center mb-4">
            {resumeData.profileImg && (
                <img
                    src={resumeData.profileImg  || 'profile.jpg'}
                    alt="Profile"
                    className="w-40 h-40 rounded-full border-4 border-white"
                />
                )}
            </div>
            {/* Contact Information */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold ">Contact</h2>
              <hr className="mt-1 h-1 bg-white " />
              <p className="mt-1  flex">
                {resumeData.phone || 'Your phone number'}
              </p>
              <p className="mt-1 flex">
                 {resumeData.email || 'Your email'}
              </p>
              <p className="mt-1 flex">
                {resumeData.location || 'Your location'}
              </p>
            </div>

            <div className="mt-6 education">
              <h2 className="text-xl font-semibold">Education</h2>
              <hr className="mt-1 h-1 bg-white"></hr>
              <p className="mt-2 ">
              {resumeData.education && resumeData.education.length > 0 ? (
                    resumeData.education.map((item, index) => (
                    <span key={index}>
                        {item}
                        <br />
                    </span>
                    ))
                ) : (
                    'Your Education'
                )}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">language</h2>
              <hr className="mt-1 h-1 bg-white"></hr>
              <p className="mt-2">
              {resumeData.languages && resumeData.languages.length > 0 ? (
                    resumeData.languages.map((item, index) => (
                    <span key={index}>
                        {item}
                        <br />
                    </span>
                    ))
                ) : (
                    'Your languages'
                )}
              </p>
            </div>
            <div className="mt-6">
                {isVisible && (
                  <div>
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <hr className="mt-1 h-1 bg-white" />
                    <p className="mt-1">
                    {resumeData.skills && resumeData.skills.length > 0 ? (
                            resumeData.skills.map((item, index) => (
                            <span key={index}>
                                {item}
                                <br />
                            </span>
                            ))
                        ) : (
                            'Your languages'
                        )}
                    </p>
                  </div>
                )}
                <button
                  onClick={toggleVisibility}
                  className="bg-white mt-2 font-semibold px-4 py-2 rounded text-[#163853]"
                >
                  {isVisible ? 'Hide Skills' : 'Show Skills'}
                </button>
              </div>
          </div>

          {/* Right Section */}
          <div className="bg-white w-full md:w-2/3 p-8 text-[#163853]">
            <h1 className="text-4xl md:text-5xl font-extrabold mt-8">
              <span className="text-gray-700">{resumeData.name || 'Your Name'}</span>
            </h1>
            <p className="text-lg mt-2">{resumeData.profession || 'Your Profession'}</p>

            <h2 className="text-2xl font-semibold mt-14">Professional Summary</h2>
            <p className="mt-3 text-lg">
            {resumeData.professionalSummary || 'Write your professional summary here.'}
            </p>

            <h2 className="text-2xl font-semibold mt-8">Expertise</h2>
            <p className="mt-3 text-lg">
            {resumeData.expertise || 'Write your expertise here.'}
            </p>

            <h2 className="text-2xl font-semibold mt-8">Job Experience</h2>
            <p className="mt-4 text-lg">
            {resumeData.jobExperience && resumeData.jobExperience.length > 0 ?  (
                resumeData.jobExperience.map((item, index) => (
                <span key={index}>
                    {item}
                    <br />
                </span>
                ))
            ) :(
              'Write your Jobexpertise here'
            ) }
            </p>
            <div className="mb-4">
        {/* <label htmlFor="filename" className="block text-lg font-semibold">
          Enter Filename:
        </label>
        <input
          type="text"
          id="filename"
          value={filename}
          onChange={handleFilenameChange}
          placeholder="Enter resume filename"
          className="p-2 mt-2 border rounded w-full"
        /> */}
      </div>
          </div>
        </div>
      </div>
    </div>
    <div className="justify-center items-center gap-2 flex pb-8">
      <button
          onClick={generatePDF}
          className="bg-slate-700 text-white py-2 px-4 rounded mt-4 "
        >
          Download PDF
      </button>
      <div>
      {resumeData.filename && (
        <div className="mt-2 bg-red-600 border text-white text-1xl font-semibold py-1 px-1">
          <strong>Shareable Link:</strong>
          <p className="text-sm text-white-700 mt-1 ">
            <a href={generateUniqueLink()} target="_blank" rel="noopener noreferrer">
              {generateUniqueLink()}
            </a>
          </p>
        </div>
      )}
      </div>
      </div>
    </div>
  );
}

export default ResumePreview

