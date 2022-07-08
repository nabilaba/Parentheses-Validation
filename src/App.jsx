import Tools from "./stack";
import {
  Flex,
  Box,
  FormLabel,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";

function App() {
  const checkParentheses = (s) => {
    let stack = new Tools();
    if (s == "") return false;
    let jumlahBracketKiri = 0;
    let jumlahBracketKanan = 0;
    let sMempunyaiBracket = false;
    for (let i = 0; i < s.length; i++) {
      if (s[i] == "(" || s[i] == "{" || s[i] == "[") {
        jumlahBracketKiri++;
        sMempunyaiBracket = true;
      } else if (s[i] == ")" || s[i] == "}" || s[i] == "]") {
        jumlahBracketKanan++;
        sMempunyaiBracket = true;
      }
    }
    if (jumlahBracketKiri != jumlahBracketKanan || !sMempunyaiBracket)
      return false;

    for (let i = 0; i < s.length; i++) {
      if (s[i] == "(" || s[i] == "{" || s[i] == "[") {
        stack.push(s[i]);
      } else if (s[i] == ")" || s[i] == "}" || s[i] == "]") {
        if (
          (stack.peek() == "(" && s[i] == ")") ||
          (stack.peek() == "{" && s[i] == "}") ||
          (stack.peek() == "[" && s[i] == "]")
        ) {
          stack.pop();
        }
      }
    }
    return stack.top == -1;
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.input.value;
    const result = checkParentheses(input);
    alert(result);
  };

  return (
    <Container maxW="lg">
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} w="full">
          <Stack align="center">
            <Heading fontSize={{ base: "xl", sm: "3xl" }}>
              Parentheses Validation
            </Heading>
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              textAlign="center"
              textColor="gray.500"
            >
              Parentheses validation adalah sebuah validasi bracket ketika
              jumlah tutup buka dan tutup kurungnya sama, maka bernilai 'true',
              dan jika jumlahnya tidak sama, maka bernilai 'false'
            </Text>
          </Stack>
          <Box pos="relative">
            <Box
              pos="absolute"
              top="-7px"
              right="-7px"
              bottom="-7px"
              left="-7px"
              rounded="lg"
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              transform="rotate(-2deg)"
            ></Box>
            <Stack
              as="form"
              pos="relative"
              spacing={4}
              p={6}
              bg={useColorModeValue("white", "gray.700")}
              rounded="lg"
              boxShadow="lg"
              onSubmit={HandleSubmit}
            >
              <FormControl isRequired>
                <FormLabel>Input</FormLabel>
                <Input
                  type="text"
                  placeholder="Input string"
                  rounded="md"
                  name="input"
                />
              </FormControl>
              <Button
                bg="blue.400"
                color="white"
                _hover={{
                  bg: "blue.500",
                }}
                rounded="md"
                w="100%"
                type="submit"
              >
                Check
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
}

export default App;
