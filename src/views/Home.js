import './styles/Home.css';
import React, { useState } from "react";
import Header from '../components/Header';
import Post from '../components/Post';
import FooterMenu from '../components/FooterMenu';

function Home() {

    const postData = [
        {
          likecount: 100,
          username: 'kendall Jenner',
          isliked: true,
          src: '/sample/d1.jpg'
        },
        {
          likecount: 200,
          username: 'selena gomez',
          isliked: false,
          src: '/sample/kj1.jpg'
        },
        {
          likecount: 300,
          username: 'kendall Jenner',
          isliked: true,
          src: '/sample/nakedkendall.jpg'
        },
        {
          likecount: '1m',
          username: 'dualipa',
          isliked: false,
          src: '/sample/d4.jpg'
        }
      ];

    return(
        <>
        <Header/>
        <center>
        <div className='post-container'>

        {postData.map((post, index) => (
        <Post
          uniqueid={`postid` + index}
          likecount={post.likecount}
          username={post.username}
          isliked={post.isliked}
          src={post.src}
        />
      ))}

        </div>
        </center>
        <FooterMenu/>
        </>
    );
}

export default Home;
