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
import { useState } from "react";

function App() {
  const [data, setData] = useState([
    {
      id: 1,
      masukkan: "({[ nabil_aba ]})",
      hasil: true,
    },
  ]);
  const [masukkan, setMasukkan] = useState("");
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
    setData([
      ...data,
      {
        id: data.length + 1,
        masukkan: masukkan,
        hasil: checkParentheses(masukkan),
      },
    ]);
    setMasukkan("");
  };

  return (
    <Container maxW="lg">
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        direction="column"
        gap={8}
      >
        <Stack spacing={8} w="full">
          <Stack align="center">
            <Heading
              fontSize={{ base: "xl", sm: "3xl" }}
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
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
                <FormLabel>Kalimat</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan kalimat yang ingin dicek"
                  rounded="md"
                  name="input"
                  value={masukkan}
                  onChange={(e) => setMasukkan(e.target.value)}
                />
              </FormControl>
              <Button
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                color="white"
                _hover={{
                  transform: "translateY(-2px)",
                }}
                rounded="md"
                w="100%"
                type="submit"
              >
                Cek
              </Button>
            </Stack>
          </Box>
        </Stack>
        <Stack w="full" spacing={2}>
          {data.length > 0 &&
            data.map((item, index) => (
              <Stack w="full" key={index}>
                <Box pos="relative">
                  <Box
                    pos="absolute"
                    top="-2px"
                    right="-2px"
                    bottom="-2px"
                    left="-2px"
                    rounded="lg"
                    bgGradient="linear(to-l, #7928CA,#FF0080)"
                  ></Box>
                  <Box
                    pos="relative"
                    bg={useColorModeValue("white", "gray.800")}
                    rounded="lg"
                    px={4}
                    py={2}
                  >
                    <Text as="p">
                      Data:{" "}
                      <Text as="span" fontWeight="bold">
                        {item.masukkan}
                      </Text>
                    </Text>
                    <Text as="p">
                      Hasil Validasi:{" "}
                      <Text
                        as="span"
                        color={item.hasil ? "green.500" : "red.500"}
                      >
                        {item.hasil ? "True" : "False"}
                      </Text>
                    </Text>
                  </Box>
                </Box>
              </Stack>
            ))}
        </Stack>
      </Flex>
    </Container>
  );
}

export default App;
