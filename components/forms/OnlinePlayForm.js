import { Button, Input, FormLabel, Select } from "@chakra-ui/core";
import { Formik } from "formik";
import Router from "next/router";

const OnlinePlayForm = () => (
  <Formik
    initialValues={{ size: "7" }}
    onSubmit={(values) => {

      Router.push({
        pathname: "/board",
        query: {
          size: values.size,
          online: true,
          player1_nickname: values.player1_nickname,
        },
      });
    }}
  >
    {({ handleSubmit, handleChange, values }) => (
      <form onSubmit={handleSubmit}>
        <FormLabel htmlFor="player1_nickname">Your nickname</FormLabel>
        <Input
          id="player1_nickname"
          onChange={handleChange}
          value={values.nickname}
          tabIndex="0"
        ></Input>

        <FormLabel htmlFor="size">Size of the board</FormLabel>
        <Select
          id="size"
          onChange={handleChange}
          value={values.size}
          tabIndex="0"
        >
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

export default OnlinePlayForm;
