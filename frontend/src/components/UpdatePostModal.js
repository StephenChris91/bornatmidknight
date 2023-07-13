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
      setPostContent(data.content);
      console.log(post.content);
      console.log(data);
    };

    getPost();
  }, []);

  const handlePostChange = newValue => {
    setPostContent(newValue);
  };

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
          <ModalHeader>Update Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                title: post.title || '',
                summary: post.summary || '',
                image: post.image || '',
                date: post.date || '',
                category: post.category || '',
                // postContent: post.content || '',
              }}
              onSubmit={async (values, actions) => {
                // let updatedContent = post.content;
                try {
                  const data = { ...values, postContent, id: post._id };
                  // Make the API call to update the post
                  const response = await fetch(`http://localhost:4000/post/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                  });

                  if (response.ok) {
                    alert('Post updated successfully');
                    console.log(data);
                    onClose(); // Close the modal after successful update
                  } else {
                    alert('Failed to update post');
                  }
                } catch (error) {
                  console.error(error);
                  alert('An error occurred while updating the post');
                }

                actions.setSubmitting(false);
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

                    <ReactQuill
                      theme="snow"
                      value={postContent}
                      onChange={handlePostChange}
                      // onBlur={field.onBlur}
                      modules={modules}
                      formats={formats}
                      // {...field}
                    />
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
