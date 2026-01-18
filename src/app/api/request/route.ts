import { ResponseType, HTTP_STATUS_CODE } from "@/lib/types/apiResponse";
import { connectDB } from "@/lib/db/connection";
import { ItemRequest, ItemRequestModel } from "@/lib/db/models/ItemRequest";
import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { InputException, InvalidInputError, InvalidPaginationError } from "@/lib/errors/inputExceptions";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import { Error } from "mongoose";

export async function PUT(request: Request) {
  await connectDB();

  try {
    const req = await request.json();

    const toBeInserted = Object.hasOwn(req, "newRequests")
      ? req.newRequests
      : [req];

    await ItemRequestModel.insertMany(toBeInserted);

    return new ServerResponseBuilder(ResponseType.CREATED).build();
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }

    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}



export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const status = url.searchParams.get('status');
  
  await connectDB();
  try {
    const query = status ? { status: status } : {};
    const res = await ItemRequestModel.paginate(query, {
      sort: '-createdAt',
      page: page,
      limit: PAGINATION_PAGE_SIZE
    });

    return new Response(JSON.stringify(res.docs), {
      status: HTTP_STATUS_CODE.OK
    });
  } catch (err) {
    return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
  }
}

export async function PATCH(request: Request) {
  await connectDB();
  try {
    const req = await request.json();
    if (!req.id || !req.status) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }

    const query = Array.isArray(req.id)
      ? { _id: { $in: req.id } }
      : { _id: req.id };
    
    await ItemRequestModel.updateMany(query, { status: req.status });
    return new ServerResponseBuilder(ResponseType.SUCCESS).build();
  } catch (err) {
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}

export async function DELETE(request: Request) {
  await connectDB();
  try {
    const req = await request.json();
    if (!req.id) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }

    const query = Array.isArray(req.id)
      ? { _id: { $in: req.id } }
      : { _id: req.id };
    
      await ItemRequestModel.deleteMany(query);
      return new ServerResponseBuilder(ResponseType.SUCCESS).build();
  } catch (err) {
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}
