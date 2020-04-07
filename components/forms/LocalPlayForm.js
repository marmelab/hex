import { Formik } from "formik";
import { Button, FormLabel, Select } from "@chakra-ui/core";
import Router from "next/router";

const LocalPlayForm = () => (
  <Formik
    initialValues={{ size: "7" }}
    onSubmit={values => {
      Router.push({
        pathname: "/board",
        query: { size: values.size }
      });
    }}
  >
    {({ handleSubmit, handleChange, values }) => (
      <form onSubmit={handleSubmit}>
        <FormLabel htmlFor="size">Size of the board</FormLabel>
        <Select title="Select a size" onChange={handleChange} value={values.size} tabIndex="0">
          <option value="7">7</option>
          <option value="9">9</option>
          <option value="11">11</option>
        </Select>
        <Button title="Start" mt={4} variantColor="teal" type="submit">
          Start
        </Button>
      </form>
    )}
  </Formik>
);

export default LocalPlayForm;
