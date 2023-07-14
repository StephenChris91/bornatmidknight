
import { useState } from 'react';
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
import axios from 'axios';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

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

  const FileInput = ({ field, form, ...props }) => {
    const handleChange = event => {
      form.setFieldValue(field.name, event.currentTarget.files[0]);
    };

    return <Input {...props} type="file" p={1} onChange={handleChange} />;
  };

  const validateName = value => {
    // validation logic
  };

  const handleImageUpload = (e, form) => {
    const file = e.target.files[0];
    form.setFieldValue('image', file);
  };

  const handleSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('summary', values.summary);
    formData.append('postContent', postContent);
    formData.append('category', values.category);
    formData.append('date', values.date);
    formData.append('image', values.image);

    try {
      const response = await axios.post(
        'http://localhost:4000/post',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.status === 200) {
        alert('Post created successfully');
        onClose();
      } else {
        alert('Failed to create post');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the post');
    }

    actions.setSubmitting(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                title: '',
                summary: '',
                image: '',
                date: '',
                category: '',
              }}
              onSubmit={handleSubmit}
              onReset={() => {
                // Reset form values
              }}
            >
              {props => (
                <Form>
                  <VStack spacing={8}>
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
                          <Input {...field} placeholder="Summary" size="lg" />
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
                    <Field name="date" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.date && form.touched.date}
                        >
                          <FormLabel>Schedule Date</FormLabel>
                          <Input
                            {...field}
                            placeholder="Date"
                            size="lg"
                            type="datetime-local"
                          />
                          <FormErrorMessage>
                            {form.errors.date}
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
                          <FileInput field={field} form={form} size="lg" />
                          <FormErrorMessage>
                            {form.errors.image}
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
                          <ReactQuill
                            theme="snow"
                            value={postContent}
                            onChange={newContent => setPostContent(newContent)}
                            modules={modules}
                            formats={formats}
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
                      Create
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

export default CreatePostModal;
