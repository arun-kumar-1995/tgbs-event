import { HttpStatus } from "../constants/httpStatus.constants.js";
import { APIResponse } from "../shared/apiResponse.shared.js";
import { APIError } from "../shared/errorHandler.shared.js";
import { CatchAsyncError } from "../utils/catchAsyncError.utils.js";
import { Event } from "../services/event.services.js";
export const getEventsList = CatchAsyncError(async (req, res, next) => {
  const Lists = await Event.getEvents();

  return APIResponse(res, HttpStatus.SUCCESS, "Here is the list of events", {
    Lists,
  });
});

export const getEventDetails = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!id)
    throw new APIError(
      HttpStatus.INVALID_REQUEST,
      "Missing required parameter 'id'"
    );

  const EventDetails = await Event.getEventDetails(id);

  return APIResponse(res, HttpStatus.SUCCESS, "Here is event details", {
    EventDetails,
  });
});
