import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import "../homepage/homepage.css";
import firstImage from "../../images/360_F_329812519_R6GkhIJ0r9SMCtWg4dEwRmxnJLMG4XBL.jpg";
import secondImage from "../../images/Autism_thumbnail.jpg";
import thirdImage from "../../images/mom-son-with-pediatrician-1296-728-header.avif";
import whatIsAutism from "../../images/What_is_autism.jpg";

const HomePage = () => {
  const images = [
    {
      url: firstImage,
    },
    {
      url: secondImage,
    },
    {
      url: thirdImage,
    },
    // {
    //   url: firstImage,
    // },
    // {
    //   url: secondImage,
    // },
    // {
    //   url: "https://cdn.prod.website-files.com/66390c6e162a2070bfe399de/663a466cb985e9d188854a9b_64990825676e98b749efb5bc_autistic-child.jpeg",
    // },
  ];

  const screenWidth = window.innerWidth - 200;
  const screenHeight = window.innerHeight - 200;

  return (
    <div>
      <div className="homepage-container" id="home">
        <div className="homepage-image-slider-container">
          <SimpleImageSlider
            className="homepage-slider-images"
            width={screenWidth}
            height={screenHeight}
            images={images}
            showBullets={true}
            showNavs={true}
            autoPlay={true}
            autoPlayDelay={2.0}
          />
        </div>
        <div className="homepage-hero-container">
          <p className="hero-heading">
            Autism doesn't have a look. Autism is not a label. Autism is a way
            of being.
          </p>
        </div>
      </div>
      <div className="homepage-features-section" id="info">
        <div className="feature-section-container">
          <div className="feature-first-section">
            <h2>What is autism?</h2>
            <p>
              Autism, or autism spectrum disorder (ASD), refers to a broad range
              of conditions characterized by challenges with social skills,
              repetitive behaviors, speech and nonverbal communication.
              According to the Centers for Disease Control, autism affects an
              estimated 1 in 36 children and 1 in 45 adults in the United States
              today.
            </p>
          </div>

          <div className="feature-first-section">
            <img src={whatIsAutism} alt="" />
          </div>
        </div>

        <div className="feature-section-container">
          <div className="feature-first-section">
            <h2>We know that there is not one type of autism, but many.</h2>
            <p>
              Autism looks different for everyone, and each person with autism
              has a distinct set of strengths and challenges. Some autistic
              people can speak, while others are nonverbal or minimally verbal
              and communicate in other ways. Some have intellectual
              disabilities, while some do not. Some require significant support
              in their daily lives, while others need less support and, in some
              cases, live entirely independently.
              <br />
              <br />
              On average, autism is diagnosed around age 5 in the U.S., with
              signs appearing by age 2 or 3. Current diagnostic guidelines in
              the DSM-5-TR break down the ASD diagnosis into three levels based
              on the amount of support a person might need: level 1, level 2,
              and level 3. See more information about each level.
            </p>
          </div>

          <div className="feature-first-section">
            <h2>We know that there is not one type of autism, but many.</h2>
            <p>
              Autism looks different for everyone, and each person with autism
              has a distinct set of strengths and challenges. Some autistic
              people can speak, while others are nonverbal or minimally verbal
              and communicate in other ways. Some have intellectual
              disabilities, while some do not. Some require significant support
              in their daily lives, while others need less support and, in some
              cases, live entirely independently.
              <br />
              <br />
              On average, autism is diagnosed around age 5 in the U.S., with
              signs appearing by age 2 or 3. Current diagnostic guidelines in
              the DSM-5-TR break down the ASD diagnosis into three levels based
              on the amount of support a person might need: level 1, level 2,
              and level 3. See more information about each level.
            </p>
          </div>
        </div>
      </div>

      <div className="homepage-graph-section" id="about">
        <div className="about-section-container">
          <div className="about-first-section">
            <h2>About the ASD Detection Web Application</h2>
            <p>
              This web application is designed to assist in the early detection
              of Autism Spectrum Disorder (ASD) by leveraging machine learning
              algorithms to analyze key features associated with ASD. The app
              provides a user-friendly interface to input data and obtain
              predictions, offering a valuable tool for educational purposes and
              raising awareness about ASD detection techniques.
            </p>
          </div>

          <div className="about-first-section">
            <h2>Machine Learning Models Used:</h2>
            <p>
              <b>1. Support Vector Machine (SVM):</b> A supervised learning
              algorithm known for its effectiveness in high-dimensional spaces
              and flexibility with classification boundaries.
            </p>
            <p>
              <b>2. Random Forest:</b> An ensemble learning method that builds
              multiple decision trees to improve accuracy and robustness,
              reducing the likelihood of overfitting.
            </p>
            <p>
              <b>3. Gradient Boosting:</b> This model creates an ensemble of
              weak learners, typically decision trees, to incrementally improve
              predictions by minimizing errors.
            </p>
            <p>
              <b>4. XGBoost:</b> A highly efficient and optimized version of
              gradient boosting, popular for its speed and accuracy, especially
              in structured data tasks.
            </p>
            <p>
              <b>5. Neural Network:</b> A deep learning approach that captures
              complex patterns by learning hierarchical representations of data.
            </p>
            <p>
              <b>6. Stacked Model:</b> A combination of the above models to
              leverage their strengths, improving overall prediction accuracy.
            </p>
            <p>
              Each model is evaluated on key metrics such as accuracy,
              precision, and recall, with results indicating that ensemble
              methods like Random Forest and XGBoost perform exceptionally well
              for ASD prediction tasks. This comparative analysis helps identify
              the best-performing models for ASD detection.
            </p>
          </div>
        </div>
        <div className="disclaimer">Disclaimer</div>
        <div className="about-first-section">
          <h2>Educational Use Only</h2>
          <p>
            This application is developed solely for educational purposes and is
            not intended for medical diagnosis or clinical use. The predictions
            provided by the models are based on data patterns and statistical
            analysis, which cannot replace a comprehensive evaluation by a
            qualified medical professional.
          </p>
          <p>
            <b>Users should understand that:</b>
          </p>
          <p>
            &emsp;- The app's results are informative and should not be relied
            upon as a definitive diagnosis.
          </p>
          <p>
            &emsp;- Machine learning models may have limitations and biases,
            especially in sensitive areas like ASD detection, where variability
            across individuals is high.
          </p>
          <p>
            &emsp;- For any health-related concerns, consult with a certified
            healthcare provider or specialist.
          </p>
          <p>
            By using this app, users agree to use the information at their
            discretion and acknowledge the app's purpose as an educational tool.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
