import React, { useEffect, useState } from 'react';
import first from "../../Assets/Firstslide.png";
import second from "../../Assets/secondslide.webp";
import third from "../../Assets/thirdsilde.webp";
import fouth from "../../Assets/fourthslide.webp";
import "./home.css";
import Job from './Job';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("Big Brands");
    const [internshipData, setInternshipData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://internshipbackend-vwja.onrender.com/api/internship`);
                setInternshipData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const filterInternShips = internshipData.filter((item) =>
        !selectedCategory || item.category === selectedCategory
    );

    const handleSlide = (direction) => {
        const container = document.getElementById("container");
        const step = 100;
        if (direction === 'left') {
            setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 0));
        } else {
            setCurrentSlide((prevSlide) => (prevSlide < 3 ? prevSlide + 1 : 3));
        }
        sideScroll(container, direction, 25, step, 10);
    };

    const handleSlideIntern = (direction) => {
        const container = document.getElementById("container2");
        const step = 100;
        if (direction === 'left') {
            setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 0));
        } else {
            setCurrentSlide((prevSlide) => (prevSlide < 3 ? prevSlide + 1 : 3));
        }
        sideScrollIntern(container, direction, 25, step, 10);
    };
    const sideScroll = (element, direction, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            if (direction === 'left') {
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
        }, speed);
    };
    
    const sideScrollIntern = (element, direction, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            if (direction === 'left') {
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
        }, speed);
    };
    

    return (
        <>
            <h1 className='text-center text-3xl font-bold'>Make your dream career a reality</h1>
            <p className='text-center text-lg font-bold'>Trending on InternArea 🔥</p>

            <div className="imgs flex justify-center" id='container'>
                <div className="slide flex mt-10" id='content'>
                    <img className='slide_Img ml-4' src={first} alt="" />
                    <img className='slide_Img ml-4' src={second} alt="" />
                    <img className='slide_Img ml-4' src={third} alt="" />
                    <img className='slide_Img ml-4' src={fouth} alt="" />
                </div>
            </div>
            <div className="flex BUttons">
                <button className='back' onClick={() => handleSlide('left')}> <i className='bi bi-chevron-left' id='sideBack'></i></button>
                <button className="next" onClick={() => handleSlide('right')}> <i className='bi bi-chevron-right' id='slide'></i></button>
            </div>

            <div className="infoys">
                <div className="info-intern">
                    <div className="mt-16">
                        <h1 className='text-center font-bold'>Latest internships on Intern Area</h1>
                    </div>
                    <div className="categories flex flex-wrap mt-14">
                        <p>POPULAR CATEGORIES :</p>
                        <span className={`category mr-4 ml-6 ${selectedCategory === 'Big Brands' ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory('Big Brands')}>Big Brands</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "Work From Home" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Work From Home")}>Work From Home</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "Part-time" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Part-time")}>Part-time</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "MBA" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("MBA")}>MBA</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "Engineering" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Engineering")}>Engineering</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "media" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("media")}>Media</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "Design" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Design")}>Design</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "Data Science" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Data Science")}>Data Science</span>
                    </div>
                </div>
                <div className="internships" id='container2'>
                    <div className="internShip-Info flex">
                        {
                            filterInternShips.map((data, index) => (
                                <div className="int-1 mt-6" key={index}>
                                    <p className='mb-4 mt-3' id='boxer'> <i className='bi bi-arrow-up-right text-blue-500'></i> Actively Hiring</p>
                                    <p>{data.title}</p>
                                    <small className='text-slate-400 text-sm'>{data.company}</small>
                                    <hr className='mt-5' />
                                    <p className='mt-3'><i className="bi bi-geo-alt-fill"></i> {data.location}</p>
                                    <p className='mt-1'><i className="bi bi-cash-stack"></i> {data.stipend}</p>
                                    <p className='mt-1'><i className="bi bi-calendar-fill"></i> {data.Duration}</p>
                                    <div className='more flex justify-between mt-6'>
                                        <span className='bg-slate-200 text-slate-400 w-20 rounded-sm text-center'>Internship</span>
                                        <Link to={`/detailInternship?q=${data._id}`}>
                                            <span className='text-blue-500 mr-2'>
                                                View details <i className="bi bi-chevron-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex BUttons mt-9">
                    <button className='back' onClick={() => handleSlideIntern('left')}> <i className='bi bi-chevron-left' id='sideBack'></i></button>
                    <button className="next" onClick={() => handleSlideIntern('right')}> <i className='bi bi-chevron-right' id='slide'></i></button>
                </div>
            </div>
            <Job />
            <hr />
            <div className="analytics mt-8 flex flex-wrap justify-center items-center text-center">
                <div className="text-block mt-5">
                    <span className='font-bold text-6xl text-blue-600'>300K+</span>
                    <p>companies hiring</p>
                </div>
                <div className="text-block mt-5">
                    <span className='font-bold text-6xl text-blue-600'>10K+</span>
                    <p>new openings everyday</p>
                </div>
                <div className="text-block mt-5">
                    <span className='font-bold text-6xl text-blue-600'>21Mn+</span>
                    <p>active students</p>
                </div>
                <div className="text-block mt-5">
                    <span className='font-bold text-6xl text-blue-600'>600K+</span>
                    <p>learners</p>
                </div>
            </div>
            <div className="logins flex h-32 mt-8">
                <div className="cont">
                    <p className="flex justify-center text-white text-xl items-center m-5 w-30">Empower your career with InternArea today</p>
                </div>
                <div className="log flex">
                    <a href="/register" id='buttons' className="flex items-center bg-white h-9 justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                        <div className="px-4 py-3">
                            <svg className="h-6 w-6" viewBox="0 0 40 40">
                                <path d="M36 20c0-8.836-7.164-16-16-16S4 11.164 4 20s7.164 16 16 16 16-7.164 16-16zm-29.4 0C6.6 13.6 10.75 8.6 16.5 7.2v4.15h-3.5v2.65h3.5v2.1c0 3.45 2.7 6.3 6.4 6.3 1.15 0 2.4-.35 3.4-.95v-2.55h-2.1c-2 0-3.15-1.45-3.15-3.2v-2.15h5.35v-2.65H23.3V7.2C29.1 8.6 33.25 13.6 33.25 20s-4.15 11.4-9.9 12.8V24.6H20v-2.65h2.3v-2.15c0-1.75 1.15-3.2 3.15-3.2h2.1V13.7c-1-.6-2.25-.95-3.4-.95-3.7 0-6.4 2.85-6.4 6.3v2.1h-3.5v-2.65h3.5V7.2c-5.75 1.4-9.9 6.4-9.9 12.8z" fill="#000" />
                            </svg>
                        </div>
                        <p className="text-black text-base">Login with Google</p>
                    </a>
                </div>
            </div>
        </>
    );
}

export default Home;
