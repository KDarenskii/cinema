import { toast } from "react-toastify";
import { showNotion } from ".";
import { NOTION } from "../../constants/notion";

describe("Toast notion", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should call success notion", () => {
        const spy = jest.spyOn(toast, "success");
        showNotion(NOTION.SUCCESS, "Success notion");
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should call error notion", () => {
        const spy = jest.spyOn(toast, "error");
        showNotion(NOTION.ERROR, "Error notion");
        expect(spy).toHaveBeenCalledTimes(1);
    })
});
