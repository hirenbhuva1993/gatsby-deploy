
import React, { Component, useState } from "react"
import { graphql, Link } from "gatsby"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Layout from "../components/layout"
import {Modal, Button, Carousel } from 'react-bootstrap'



function PopUpModel(value) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        {value.buttonLabel  }
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

class PageTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoader: false
    };
  }

 handleSubmit = (values, { 
    props = this.props, 
    setSubmitting,
    resetForm,
    initialValues
  }) => {
     
    //alert(JSON.stringify(values, null, 2));
    console.log(values.company_name);
    this.setState({
      isLoader: true
    });
    let QuerystringData = {
        'company_name' : values.company_name,
        'contact_state' : values.contact_state,
        'contactno' : values.contactno,
        'email' : values.email,
        'Name' : values.Name,
        'message' : values.message,
        'number_of_screen' : values.number_of_screen,
        'number_of_store' : values.number_of_store
    };

    let formBody = [];
    for (let property in QuerystringData) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(QuerystringData[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch('http://localhost/xynage/wp-json/contact-form-7/v1/contact-forms/436/feedback', {
        method: 'POST',
        mode: 'CORS',
        body: formBody,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res) => res.json()).then((responseData) => {
        console.log(responseData.status);
        this.setState({
          isLoader: false
        });
        resetForm(initialValues);
    }).catch(err => err);
    setSubmitting(false);
    return;
  }
  render() {
    const StaticPage = this.props.data.wordpressPage
    console.log(StaticPage.acf)
    return (
      <Layout>
          {!!StaticPage.acf && StaticPage.acf.global_templates_page && StaticPage.acf.global_templates_page.length > 0 && StaticPage.acf.global_templates_page.map((e, i) => {
            //console.log(e.__typename);
              if(e.__typename === "WordPressAcf_left_side_content_right_side_slider") 
              {
                return (
                  <section key={i} className={"inner-page-top-section  section"}>
                      <div className={"container"}>
                          <div className={"row align-items-center"}>
                              <div className={"col-lg-6 order-lg-2"}>
                                <div className={"about-tv-section"}>
                                <div className={"abt-tv-slider"}>
                                <Carousel>
                                  {e.image_slider && e.image_slider.map((singleImage, index) =>
                                      singleImage.image === null ? '' : <Carousel.Item key={index}><img src={singleImage.image.source_url} alt="slide" /></Carousel.Item>
                                  )}
                                  </Carousel>                 
                                </div>
                              </div>
                            </div>
                              <div className={"col-lg-6 order-lg-1"}>
                                  <div className={"top-left-content"}>
                                      <h1 dangerouslySetInnerHTML={{ __html: e.title}} />
                                      <p dangerouslySetInnerHTML={{ __html: e.short_description}} />
                                      <p>
                                          <PopUpModel buttonLabel={e.cta_button} />
                                      </p>
                                  </div>
                              </div>
                            
                          </div>
                      </div>
                  </section>
                );
              }
              if(e.__typename === "WordPressAcf_left_side_content_right_side_icon_and_text") 
              {
                return (
                  <section key={i} className={"about-us-cont-sec section eb-color"}>
                     <div className={"container"}>
                        <div className={"row"}>
                           <div className={"col-lg-6"}>
                              <div className={"cnt-left"}>
                                 <div className={"sec-title  text-left p-0"}>
                                    <h2 dangerouslySetInnerHTML={{ __html: e.title}} />
                                 </div>
                                 <p dangerouslySetInnerHTML={{ __html: e.short_description}} />
                                 <p className={"pt-3"}>
                                  <Link className={"btn  btn-primary"} to={e.cta_link} data-toggle="modal" data-target="#contactModal" role="button">{e.cta_button}</Link>
                                </p>
                              </div>
                           </div>
                           <div className={"col-lg-6"}>
                              <div className={"company-info"}>
                                 <ul>
                                    {e.logo_section && e.logo_section.map((singleLogo, index) =>
                                      singleLogo.image === null 
                                          ? '' 
                                          : <li key={index}>
                                               <div className={"ico"}>
                                                  <img src={singleLogo.image.source_url} alt="logo" />
                                               </div>
                                               <div className={"cnt"}>
                                                  <p>{singleLogo.count}</p>
                                                  <span>{singleLogo.text}</span>
                                               </div>
                                            </li>
                                    )}
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
                );
              }
              if(e.__typename === "WordPressAcf_key_features") 
              {
                return(
                  <section key={i} className={"key-features-section section"}>
                     <div className={"container"}>
                        <div className={"row"}>
                           <div className={"col-lg-12"}>
                              <div className={"sec-title"}>
                                 <h2 dangerouslySetInnerHTML={{ __html: e.main_title}} />
                              </div>
                           </div>
                        </div>
                        <div className={"row"}>
                            {e.key_feature && e.key_feature.map((singleKeyFeature, index) =>
                              singleKeyFeature.image === null 
                                  ? '' 
                                  : <div key={index} className={"col-lg-4 col-md-6 col-sm-6"}>
                                      <div className={"key-featur-box"}>
                                         <div className={"svg-img"}>
                                            <img src={singleKeyFeature.image.source_url} alt="key" />
                                         </div>
                                         <h3 dangerouslySetInnerHTML={{ __html: singleKeyFeature.title}} />
                                         <p dangerouslySetInnerHTML={{ __html: singleKeyFeature.description}} />
                                      </div>
                                   </div>
                            )}
                           <div className={"col-lg-12"}>
                              <div className={"call-to-action text-center"}>
                                 <p dangerouslySetInnerHTML={{ __html: e.cta_short_description_label}} />
                                 <Link className={"btn  btn-primary"} to={e.cta_link} data-toggle="modal" data-target="#contactModal" role="button">{e.cta_button_text}</Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
                );
              }
              if(e.__typename === "WordPressAcf_slider_full_content") 
              {
                return(
                  <section key={i} className={"inner-page-top-section section pb-0"}>
                     <div className={"container"}>
                        <div className={"row align-items-center"}>
                           <div className={"col-lg-8 col-md-12 pr-0"}>
                              <div className={"top-left-content"}>
                                 <h1 dangerouslySetInnerHTML={{ __html: e.title}} />
                                 {e.sub_title ? <h2 className={"sub-text"} dangerouslySetInnerHTML={{ __html: e.sub_title}} /> : ''}
                                 <p dangerouslySetInnerHTML={{ __html: e.short_description}} />
                                 {e.cta_button ? <Link className={"btn  btn-primary"} to={e.cta_link} data-toggle="modal" data-target="#contactModal" role="button">{e.cta_button}</Link> : ''}
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
                );
              }
              if(e.__typename === "WordPressAcf_2_column_box") 
              {
                return(
                  <section key={i} className={"two-col-layout section pb-0"}>
                     <div className={"container"}>
                        <div className={"row custom-pad"}>
                           {e.image_and_description_block && e.image_and_description_block.map((singleBlock, index) =>
                              singleBlock.image === null 
                                  ? '' 
                                  : <div key={index} className={"col-lg-6 col-md-6 col-sm-6"}>
                                      <div className={"card custom-card"}>
                                         <div className={"card-img"}>
                                            <img className={"card-img-top"} src={singleBlock.image.source_url} alt="card" />
                                         </div>
                                         <div className={"card-body"}>
                                            <h3 dangerouslySetInnerHTML={{ __html: singleBlock.title}} />
                                            <p className={"card-text"} dangerouslySetInnerHTML={{ __html: singleBlock.short_description}} />
                                         </div> 
                                      </div>
                                   </div>
                            )}

                           <div className={"col-lg-12"}>
                              <div className={"call-to-action text-center"}>
                                 <p dangerouslySetInnerHTML={{ __html: e.cta_short_description_label}} />
                                 {e.cta_button_text ? <Link className={"btn  btn-primary"} to={e.cta_link} data-toggle="modal" data-target="#contactModal" role="button">{e.cta_button_text}</Link> : ''}
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
                );
              }
              if(e.__typename === "WordPressAcf_leverage_section") 
              {
                return(
                  <section key={i} className={"leverage-section section"}>
                     <div className={"container"}>
                        {e.main_title ? 
                            <div className={"row"}>
                               <div className={"col-lg-12"}>
                                  <div className={"sec-title"}>
                                     <h2 dangerouslySetInnerHTML={{ __html: e.main_title}} />
                                  </div>
                               </div>
                            </div> : ''
                        }
                        <div className={"row"}>
                           {e.image_and_description_block && e.image_and_description_block.map((singleBlock, index) =>
                              singleBlock.image === null 
                                  ? '' 
                                  : <div key={index} className={"col-lg-4 col-md-6 col-sm-6"}>
                                      <div className={"card custom-card"}>
                                         <div className={"card-img"}>
                                            <img className={"card-img-top"} src={singleBlock.image.source_url} alt="image" />
                                         </div>
                                         <div className={"card-body"}>
                                            <h3 dangerouslySetInnerHTML={{ __html: singleBlock.title}} />
                                            <p className={"card-text"} dangerouslySetInnerHTML={{ __html: singleBlock.short_description}} />
                                         </div>
                                      </div>
                                   </div>
                            )}
                           <div className={"col-lg-12"}>
                              <div className={"call-to-action text-center"}>
                                 <p dangerouslySetInnerHTML={{ __html: e.cta_short_description_label}} />
                                 {e.cta_button_text ? <Link className={"btn  btn-primary"} to={e.cta_link} data-toggle="modal" data-target="#contactModal" role="button">{e.cta_button_text}</Link> : ''}
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
                );
              }
              if(e.__typename === "WordPressAcf_work_slider") 
              {
                return(
                  <section key={i} className={"feature-work-sec section"}>
                     <div className={"container"}>
                        <div className={"row"}>
                           <div className={"col-lg-12"}>
                              <div className={"sec-title text-left"}>
                                 <h2 style={{color: e.label_color}} dangerouslySetInnerHTML={{ __html: e.label}} />
                              </div>
                           </div>
                        </div>
                        <div className={"fearture-work-slider"}>
                        <Carousel>
                           {e.slider && e.slider.map((singleSlider, index) =>
                              singleSlider.image === null 
                                  ? '' 
                                  : <Carousel.Item key={index}>
                                      <div className={"row"}>
                                         <div className={"col-lg-6"}>
                                            <div className={"slider-cont-sec"}>
                                               <div className={"m-logo"}>
                                                  <img src={singleSlider.image.source_url} alt="Mcdonalds logo" />
                                               </div>
                                               <div className={"slide-text"}>
                                                  <p dangerouslySetInnerHTML={{ __html: singleSlider.title}} />
                                                  <p dangerouslySetInnerHTML={{ __html: singleSlider.short_description}} />
                                               </div>
                                            </div>
                                         </div>
                                         <div className={"col-lg-6"}>
                                            <div className={"slide-image"}>
                                               <img src={singleSlider.right_image.source_url} alt="slide image" />
                                            </div>
                                         </div>
                                      </div>
                                   </Carousel.Item>
                            )}
                          </Carousel>
                        </div>
                     </div>
                  </section>
                );
              }
              if(e.__typename === "WordPressAcf_get_a_quote_section") 
              {
                return(
                  <section key={i} className={"get-a-quot-sec"}>
                      <div className={"container"}>
                          <div className={"row align-items-center"}>
                              <div className={"col-lg-5"}>
                                  <div className={"home-testimon"}>
                                      <div className={"tmonial-acrousel"}>
                                      <Carousel>
                                   {e.testimonial_slider && e.testimonial_slider.map((singleTestimonialSlider, index) =>
                                      singleTestimonialSlider.image === null 
                                          ? '' 
                                          : <Carousel.Item key={index}>
                                            <div className={"client-thumb"}>
                                            <img src={singleTestimonialSlider.image.source_url} alt="General Manager" />
                                            </div>
                                            <h3 dangerouslySetInnerHTML={{ __html: singleTestimonialSlider.designation}} />
                                            <span dangerouslySetInnerHTML={{ __html: singleTestimonialSlider.company_name}} />
                                            <p className={"quote-text"} dangerouslySetInnerHTML={{ __html: singleTestimonialSlider.quote_text}} />
                                          </Carousel.Item>
                                    )}
                                    </Carousel>
                              </div>
                              </div>
                              </div>
                              <div className={"col-lg-6"}>
                                  <div className={"get-quote-outer"}>
                                      <h2 className={"got-q-title"} dangerouslySetInnerHTML={{ __html: e.got_questions_title}} />
                                      <span className={"subtitle-text"} dangerouslySetInnerHTML={{ __html: e.got_questions_sub_title}} />
                                      <div className={"form-outer"}>
                                        <Formik
                                            initialValues={{
                                               Name: '',
                                               email: '',
                                               company_name: '',
                                               number_of_store: '',
                                               number_of_screen: '',
                                               message: '',
                                               contactno: '8460145445',
                                               contact_state: ''
                                            }}
                                            validate={(values) => {
                                              let errors = {};
                                          
                                              if (!values.email) {
                                                errors.email = 'The field is required.';
                                              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                                errors.email = 'Invalid email address';
                                              }
                                              if(!values.Name)
                                                 errors.Name = "The field is required.";
                                              if(!values.company_name)
                                                 errors.company_name = "The field is required.";
                                                  
                                                 //check if my values have errors
                                                 return errors;
                                            }}
                                            onSubmit={this.handleSubmit}
                                            render={formProps => {
                                              return(
                                                <Form className={"wpcf7-form"}>
                                                  <div className={"row"}>
                                                   <div className={"col-lg-6"}>
                                                      <div className={"form-group"}>
                                                        <span className={"wpcf7-form-control-wrap Name"}>
                                                          <Field 
                                                            type="text" 
                                                            name="Name" 
                                                            placeholder="Name*"
                                                            className="wpcf7-form-control wpcf7-text form-control input-lg" 
                                                          /> 
                                                          <span role="alert" className={"wpcf7-not-valid-tip"}><ErrorMessage name="Name" /></span>
                                                        </span>
                                                      </div>
                                                    </div>

                                                    <div className={"col-lg-6"}>
                                                      <div className={"form-group"}>
                                                        <span className={"wpcf7-form-control-wrap email"}>
                                                          <Field 
                                                            type="email" 
                                                            name="email" 
                                                            placeholder="Email*"
                                                            className="wpcf7-form-control wpcf7-text wpcf7-email form-control input-lg" 
                                                          /> 
                                                          <span role="alert" className={"wpcf7-not-valid-tip"}><ErrorMessage name="email" /></span>
                                                        </span>
                                                      </div>
                                                    </div>

                                                    <div className={"col-lg-12"}>
                                                      <div className={"form-group"}>
                                                        <span className={"wpcf7-form-control-wrap company_name"}>
                                                          <Field 
                                                            type="text" 
                                                            name="company_name" 
                                                            placeholder="Company Name*"
                                                            className="wpcf7-form-control wpcf7-text form-control input-lg" 
                                                          /> 
                                                          <span role="alert" className={"wpcf7-not-valid-tip"}><ErrorMessage name="company_name" /></span>
                                                        </span>
                                                      </div>
                                                    </div>

                                                    <div className={"col-lg-6"}>
                                                      <div className={"form-group"}>
                                                        <span className={"wpcf7-form-control-wrap number_of_store"}>
                                                          <Field 
                                                            type="text" 
                                                            name="number_of_store" 
                                                            placeholder="Number of stores/locations"
                                                            className="wpcf7-form-control wpcf7-text form-control input-lg" 
                                                          />
                                                        </span>
                                                      </div>
                                                    </div>

                                                    <div className={"col-lg-6"}>
                                                      <div className={"form-group"}>
                                                        <span className={"wpcf7-form-control-wrap number_of_screen"}>
                                                          <Field 
                                                            type="text" 
                                                            name="number_of_screen" 
                                                            placeholder="Number of screens"
                                                            className="wpcf7-form-control wpcf7-text form-control input-lg" 
                                                          />
                                                        </span>
                                                      </div>
                                                    </div>

                                                    <div className={"col-lg-12"}>
                                                      <div className={"form-group"}>
                                                        <span className={"wpcf7-form-control-wrap message"}>
                                                          <Field
                                                            component="textarea"
                                                            name="message" 
                                                            placeholder="Tell us about your requirements"
                                                            className="wpcf7-form-control wpcf7-text form-control input-lg" 
                                                          />
                                                        </span>
                                                      </div>
                                                    </div>
                                                                    
                                                    <div className={"row"}>
                                                      <div className={"col-lg-12 text-center"}>
                                                        <div className={"form-group text-center submit-btn-row"}>
                                                          <Field 
                                                              type="submit" 
                                                              value="Send"
                                                              disabled={this.state.isLoader ? true : false}
                                                              className="wpcf7-form-control wpcf7-submit btn" 
                                                            />
                                                            {this.state.isLoader ? <span className={"ajax-loader"}></span> : ''}
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <Field 
                                                      type="hidden" 
                                                      name="contactno"
                                                      value="8460145445" 
                                                      className="wpcf7-form-control wpcf7-text form-control input-lg" 
                                                    />

                                                    <Field 
                                                      type="hidden" 
                                                      name="contact_state"
                                                      value="" 
                                                      className="wpcf7-form-control wpcf7-text form-control input-lg" 
                                                    />

                                                    </div>
                                                  </Form>
                                               );
                                            }}
                                         />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>
                );
              }
          })}
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      acf {
          global_templates_page {
            ... on WordPressAcf_left_side_content_right_side_slider {
              title
              short_description
              cta_link
              cta_button
              image_slider {
                image {
                  source_url
                }
              }
            }
            ... on WordPressAcf_slider_left_side_content_right_side_image {
              id
              title
              short_description
              cta_button
              cta_link
              image123: image {
                source_url
              }
              worldwide_text
              logo_section {
                image {
                  source_url
                }
                count
                text
              }
            }
            ... on WordPressAcf_left_side_content_right_side_icon_and_text {
              id
              title
              short_description
              cta_link
              cta_button
              image
              logo_section {
                count
                text
                image {
                  source_url
                }
              }
            }
            ... on WordPressAcf_slider_full_content {
              id
              title
              sub_title
              short_description
              cta_button
              cta_link
            }
            ... on WordPressAcf_leverage_section {
              id
              main_title
              image_and_description_block {
                image {
                  source_url
                }
                title
                short_description
              }
              cta_short_description_label
              cta_button_text
              cta_link
            }
            ... on WordPressAcf_2_column_box {
              id
              main_title
              image_and_description_block {
                image {
                  source_url
                }
                title
                short_description
              }
              cta_short_description_label
              cta_button_text
              cta_link
            }
            ... on WordPressAcf_key_features {
              id
              main_title
              key_feature {
                image {
                  source_url
                }
                title
                description
              }
              cta_short_description_label
              cta_button_text
              cta_link
            }
            ... on WordPressAcf_industry_we_work_section {
              id
              main_title
              industry_block {
                image {
                  source_url
                }
                link
                title
              }
            }
            ... on WordPressAcf_work_slider {
              id
              background_color
              label
              label_color
              slider {
                image {
                  source_url
                }
                right_image {
                  source_url
                }
                short_description
                title
              }
            }
            ... on WordPressAcf_get_a_quote_section {
              id
              got_questions_sub_title
              got_questions_title
              form_shortcode
              testimonial_slider {
                company_name
                designation
                image {
                  source_url
                }
                quote_text
              }
            }
            ... on WordPressAcf_blog_section {
              id
              title
              blog {
                post_content
                post_excerpt
                post_name
                post_title
                wordpress_id
              }
            }
          }
        }
    }
    site {
      id
      siteMetadata {
        title
        description
      }
    }
  }
`
