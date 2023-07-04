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
  //   TextArea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

import { Field, Form, Formik, useFormik } from 'formik';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [value, setValue] = useState('');

  //   const formik = useFormik({
  //     initialValues: {
  //       email: '',
  //     },
  //     onSubmit: values => {
  //       alert(JSON.stringify(values, null, 2));
  //     },
  //   });
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
  function validateName(value) {
    // let error;
    // if (!value) {
    //   error = 'Name is required';
    // } else if (value.toLowerCase() !== 'naruto') {
    //   error = "Jeez! You're not a fan 😱";
    // }
    // return error;
    console.log('validated');
  }
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

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
                post: '',
              }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
              }}
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
                    <Field name="summart" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.summary && form.touched.summary
                          }
                        >
                          <FormLabel>Summary</FormLabel>
                          <Input {...field} placeholder="name" size="lg" />
                          <FormErrorMessage>
                            {form.errors.summary}
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
                      value={value}
                      onChange={setValue}
                      modules={modules}
                      formats={formats}
                    />
                  </VStack>
                  <ModalFooter>
                    <Button
                      onClick={onClose}
                      colorScheme="blue"
                      //   mr={3}
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
