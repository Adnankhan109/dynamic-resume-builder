"use client";
import { useState } from "react";
import ResumePreview from "./ResumeStrucher"; 



export default function ResumeForm() {
  const [profileImg, setProfileImg] = useState<string | undefined>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [professionalSummary, setProfessionalSummary] = useState<string>("");
  const [expertise, setExpertise] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const [education, setEducation] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [jobExperience, setJobExperience] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [resumeData, setResumeData] = useState<any>(null);
  

  // Handlers for dynamic fields
  const addEducation = () => setEducation([...education, ""]);
  const addSkill = () => setSkills([...skills, ""]);
  const addLanguage = () => setLanguages([...languages, ""]);
  const addJobExperience = () => setJobExperience([...jobExperience, ""]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10,15}$/.test(phone)) {
      newErrors.phone = "Phone number is invalid. It should contain 10 to 15 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
   const updateEducation = (index: number, value: string) => {
     const updatedEducation = [...education];
     updatedEducation[index] = value;
     setEducation(updatedEducation);
   };
 
   const updateSkill = (index: number, value: string) => {
     const updatedSkills = [...skills];
     updatedSkills[index] = value;
     setSkills(updatedSkills);
   };
 
   const updateLanguage = (index: number, value: string) => {
     const updatedLanguages = [...languages];
     updatedLanguages[index] = value;
     setLanguages(updatedLanguages);
   };
 
   const updateJobExperience = (index: number, value: string) => {
     const updatedJobExperience = [...jobExperience];
     updatedJobExperience[index] = value;
     setJobExperience(updatedJobExperience);
   };

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const newResumeData = {
      profileImg,
      phone,
      email,
      location,
      education,
      skills,
      languages,
      name,
      profession,
      professionalSummary,
      expertise,
      jobExperience,
      filename,
    };
    // Update resumeData state
    setResumeData(newResumeData);
  };

  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div className="min-h-screen text-black flex items-center justify-center py-10  sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl pb-5 bg-gradient-to-r from-yellow-400 via-black-200 to-transparent
 shadow-xl rounded-lg overflow-hidden">

        <h2 className="text-4xl text-cyan-950 font-semibold text-center pt-2">Fill Your Details</h2>
         <form onSubmit={handleSubmit}>
            <div className="flex">
                <div className="w-full md:w-1/3 p-6">
                <label className="block mt-2 " htmlFor="Profile Img">Profile Image</label>
                <input
                   type="file"
                   accept="image/*"
                   onChange={handleImageChange}
                   className="w-full p-2 border border-gray-300 bg-white rounded"
                 />
                 {profileImg && (
                    <div>
                        <h3>Profile Image Preview:</h3>
                        <img src={profileImg} alt="Profile Preview" className="w-24 h-24 rounded-full" />
                    </div>
                    )}

                <label className="block mt-2">Phone<span className="font-bold text-2xl text-black">*</span></label>
                <input
                    type="tel"
                    id="phone"
                    value={phone ||''}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
                />
                {errors.phone && <span className="text-white py-1 px-2 bg-red-500">{errors.phone}</span>}
                <label className="block mt-2">Email <span className="font-bold text-2xl text-black">*</span></label>
                <input
                    type="email"
                    id="email"
                    value={email ||''}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
                />
                {errors.email && <span className="text-white py-1 px-2 bg-red-500">{errors.email}</span>}
                <label className="block mt-2">Location</label>
                <input
                    type="location"
                    id="location"
                    value={location ||''}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
                />

                {/* Render Education Fields */}
                <label className="block mt-2">Education</label>
                {education.map((edu,index)=>(
                    <input
                    key={index}
                    type="text"
                    value={edu ||''}
                    onChange={(e) => updateEducation(index, e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
                  />
                ))}
                <button 
                    type="button"
                    onClick={addEducation}
                    className="mt-2 bg-black hover:bg-red-500 text-white  p-2 rounded"
                >Add more Education</button>
                   
                <label className="block mt-2">Skills</label>
                {skills.map((edu,index)=>(
                     <input 
                     key={index}
                     type="text"
                     value={edu ||''}
                     onChange={(e) => updateSkill(index, e.target.value)}
                     className="mt-1 block w-full p-2 border rounded"
                     />
                ))}
                <button 
                    type="button"
                    onClick={addSkill}
                    className="mt-2 bg-black hover:bg-red-500 text-white  p-2 rounded"
                >Add more Skills</button>

                {/* Render Language Fields */}
                <label className="block mt-2">Language</label>
                {languages.map((edu,index)=>(
                     <input 
                     key={index}
                     type="text"
                     value={edu ||''}
                     onChange={(e) => updateLanguage(index, e.target.value)}
                     className="mt-1 block w-full p-2 border rounded"
                     />
                ))}
                <button 
                    type="button"
                    onClick={addLanguage}
                    className="mt-2 bg-black hover:bg-red-500 text-white  p-2 rounded"
                >Add more Language</button>

                </div>
                <div className="w-full md:w-2/3 p-6">
                <label className="block mt-2">Name<span className="font-bold text-2xl text-black">*</span></label>
                <input
                    type="name"
                    id="name"
                    value={name ||''}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
                />
                 {errors.name && <span className="text-white py-1 px-2 bg-red-500">{errors.name}</span>}
                <label className="block mt-2">Profession</label>
                <input
                    type="profession"
                    id="profession"
                    value={profession ||''} 
                    onChange={(e) => setProfession(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
                />

                <label className="block mt-2">Professional Summary</label>
                <textarea
                    id="professionalSummary"
                    value={professionalSummary ||''}
                    onChange={(e) => setProfessionalSummary(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
                />

                <label className="block mt-2">Expertise</label>
                <textarea
                    id="professionalSummary"
                    value={expertise ||''}
                    onChange={(e) => setExpertise(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
                />

                <label className="block mt-2">Job Experience</label>
                {jobExperience.map((edu,index)=>(
                    <textarea
                    key={index}
                    value={edu ||''}
                    onChange={(e) => updateJobExperience(index, e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
               />
                ))}
                <button
                type="button"
                onClick={addJobExperience}
                className="mt-2 bg-black hover:bg-red-500 text-white  p-2 rounded"
                >
                Add Job Experience
              </button>

                <label className="block mt-2">Filename</label>
                <input
                    id="filename"
                    value={filename ||''}
                    onChange={(e) => setFilename(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
                />
                </div>
            </div>
            <div className="flex justify-center">            
              <button  type="submit" className="bg-red-500 hover:bg-yellow-500 text-white p-2 rounded">
                Generate Resume
              </button>
            </div>

         </form>
         {resumeData && <ResumePreview resumeData={resumeData} />}
    </div>
   </div>
  );
}

