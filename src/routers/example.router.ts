import { NextFunction, Router } from "express";
import { sendResponse } from "../utils/send-response";
import { ResponseOkDto } from "../dto/responses/response-ok.dto";
import { PaginatedDataDto } from "../dto/responses/paginated-data.dto";
import { NotFoundError } from "../errors/not-found-error";

const exampleRouter = Router();

/**
 * Routes examples to :
 * How to send a successful response with ResponseOkDto
 * - Return no data
 * - Return a single object
 * - return a list of objects
 * - return a page of objects
 * How to return errors with ResponseErrorDto
 *
 */

interface User {
  name: string;
  age: number;
}

exampleRouter.get("/no-data", (req, res) => {
  sendResponse(res, new ResponseOkDto("No data returned", 200));
});

exampleRouter.get("/single-object", (req, res) => {
  const responseJsonObj = {
    name: "John Doe",
    age: 30,
  };

  sendResponse(
    res,
    new ResponseOkDto<User>(
      "Single object retrieved successfully",
      200,
      responseJsonObj
    )
  );
});

exampleRouter.get("/list-of-objects", (req, res) => {
  const responseJsonArr: User[] = [
    {
      name: "John Doe",
      age: 30,
    },
    {
      name: "Jane Doe",
      age: 25,
    },
  ];

  sendResponse(
    res,
    new ResponseOkDto<User[]>(
      "List of objects retrieved successfully",
      200,
      responseJsonArr
    )
  );
});

exampleRouter.get("/page-of-objects", (req, res) => {
  const responseJsonArr: User[] = [
    {
      name: "John Doe",
      age: 30,
    },
    {
      name: "Jane Doe",
      age: 25,
    },
  ];

  const page = 1;
  const pageSize = 2;
  const total = 100;

  sendResponse(
    res,
    new ResponseOkDto<PaginatedDataDto<User>>(
      "Page of objects retrieved successfully",
      200,
      new PaginatedDataDto<User>(responseJsonArr, page, pageSize, total)
    )
  );
});

exampleRouter.get("/error", (req, res, next: NextFunction) => {
  next(new NotFoundError("someUserName", "User not found", "username"));
});

export default exampleRouter;
