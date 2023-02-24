## Lambda Img resize S3

### Description:

This projects is just a demonstration lambda function for demonstration purposes to be used in conjunction with API-GW.
It resizes an image being sent in the request to a fixed 100x100 size and it upload its to a S3 bucket with a fixed name.

### Main scripts:

1. npm run build --> transpile TS code
2. npm run lint --> see style/format problems in code
3. npm run lint:f --> fix style/format problems in code. If the automatic fix is not possible, you will see the unfixed problems
4. npm run test --> launch unit test and see coverage
5. npm run test:d --> launch unit test with detailed output
6. npm run test:i --> you can grep test to be executed by fileName (npm run test:i -- "index")
7. npm run test:t --> you can grep test to be executed by suite (describe) (npm run test:t -- "handler")
8. npm run test:w --> launch unit test with watch mode (when a file is updated the test will be reexecuted)
9. npm run zip-artifact --> generate the zip artifact to be uploaded manually to AWS (artifact will be generated in ./dist/)
