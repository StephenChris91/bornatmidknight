import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdatePostModal = ({ isOpen, onClose, id }) => {
  const [postContent, setPostContent] = useState('');

  //   const { id } = useParams();
  const [post, setPost] = useState({});

  const dateString = post.date;
  const dateObj = new Date(dateString);

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:4000/post/${id}`);
      const data = await response.json();
      setPost(data);
    };

    getPost();
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const validateName = value => {
    // if (!value) {
    //   return 'Field is required';
    // }
    // return '';
    console.log('vjhgvhgckh');
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Post {id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                title: post.title,
                summary: post.summary,
                image: post.image,
                date: post.date,
                category: post.category,
                // postContent: null,
              }}
              onSubmit={async (values, actions) => {
                console.log(values);

                // const data = { ...values, postContent };
                // console.log(data);
                // const response = await fetch('http://localhost:4000/post', {
                //   method: 'POST',
                //   body: JSON.stringify(data),
                //   headers: { 'Content-Type': 'application/json' },
                // });
                // actions.setSubmitting(false);

                // if (response.ok) {
                //   alert('added successfully');
                // } else {
                //   alert('not added');
                // }
              }}
              onReset={() => {
                // Reset form values
              }}
            >
              {props => (
                <Form>
                  <VStack spacing={8}>
                    {/* Your other fields here */}
                    <Field name="title" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.title && form.touched.title}
                        >
                          <FormLabel>Title</FormLabel>
                          <Input {...field} placeholder="Title" size="lg" />
                          <FormErrorMessage>
                            {form.errors.title}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="summary" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.summary && form.touched.summary
                          }
                        >
                          <FormLabel>Summary</FormLabel>
                          <Input {...field} placeholder="summary" size="lg" />
                          <FormErrorMessage>
                            {form.errors.summary}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="category" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.category && form.touched.category
                          }
                        >
                          <FormLabel>Categories</FormLabel>
                          <Select placeholder="Select Category" {...field}>
                            <option value="Thoughts">Thoughts</option>
                            <option value="Children">Children</option>
                            <option value="Family">Family</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.category}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="image" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.image && form.touched.image}
                        >
                          <FormLabel>Image</FormLabel>
                          <Input
                            {...field}
                            size="lg"
                            type="file"
                            p={1}
                            onChange={event => {
                              form.setFieldValue(
                                field.name,
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          <FormErrorMessage>
                            {form.errors.image}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="date" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.date && form.touched.date}
                        >
                          <FormLabel>Schedule Date</FormLabel>
                          <Input
                            {...field}
                            placeholder="date"
                            size="lg"
                            type="datetime-local"
                          />
                          <FormErrorMessage>
                            {form.errors.date}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="postContent" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.post && form.touched.post}
                        >
                          <FormLabel>Post</FormLabel>
                          {/* <div
                            className="quill-editor"
                            dangerouslySetInnerHTML={{ __html: postContent }}
                          ></div> */}
                          <ReactQuill
                            theme="snow"
                            value={postContent}
                            onChange={newContent => {
                              console.log(newContent);
                              setPostContent(newContent);
                            }}
                            // onBlur={field.onBlur}
                            modules={modules}
                            formats={formats}
                            // {...field}
                          />
                          <FormErrorMessage>
                            {form.errors.post}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </VStack>
                  <ModalFooter>
                    <Button
                      onClick={onClose}
                      colorScheme="blue"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Update Post
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdatePostModal;