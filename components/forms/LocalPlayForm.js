import { Formik } from "formik";
import { Button, FormLabel, Select } from "@chakra-ui/core";

const LocalPlayForm = () => (
  <Formik
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);
    }}
  >
    {props => (
      <form onSubmit={props.handleSubmit}>
        <FormLabel htmlFor="size">Size of the board</FormLabel>
        <Select id="size" placeholder="Select the size of the board">
          <option value="option1">7</option>
          <option value="option2">9</option>
          <option value="option3">11</option>
        </Select>
        <Button
          mt={4}
          variantColor="teal"
          isLoading={props.isSubmitting}
          type="submit"
        >
          Start
        </Button>
      </form>
    )}
  </Formik>
);

export default LocalPlayForm;
