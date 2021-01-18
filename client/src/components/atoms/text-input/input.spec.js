import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useHooks from "./hooks";

describe("Input component hooks", () => {
  describe("updateText", () => {
    it("should update the text variable", () => {
      const { result } = renderHook(() => useHooks());
      expect(result.current.text).toBe("");
      const testPhrase = "Hello World";
      act(() => result.current.updateText({ target: { value: testPhrase } }));
      expect(result.current.text).toBe(testPhrase);
    });
    it("should update when passed a string", () => {
      const { result } = renderHook(() => useHooks());
      expect(result.current.text).toBe("");
      const testPhrase = "Hello World";
      act(() => result.current.updateText(testPhrase));
      expect(result.current.text).toBe(testPhrase);
    });
    it("should update when passed an event", () => {
      const { result } = renderHook(() => useHooks());
      expect(result.current.text).toBe("");
      const testPhrase = "Hello World";
      act(() => result.current.updateText({ target: { value: testPhrase } }));
      expect(result.current.text).toBe(testPhrase);
    });
  });
  describe("updateFocus", () => {
    it("should correctly set focus when input has focus", () => {
      const { result } = renderHook(() => useHooks());
      expect(result.current.focus).toBe(false);
      act(() => result.current.updateFocus({ type: "focus" }));
      expect(result.current.focus).toBe(true);
    });
    it("should correctly set focus when input loses focus", () => {
      const { result } = renderHook(() => useHooks());
      expect(result.current.focus).toBe(false);
      act(() => result.current.updateFocus({ type: "focus" }));
      expect(result.current.focus).toBe(true);
      act(() => result.current.updateFocus({ type: "blur" }));
      expect(result.current.focus).toBe(false);
    });
    it("should correctly set touched", () => {
      const { result } = renderHook(() => useHooks());
      expect(result.current.focus).toBe(false);
      act(() => result.current.updateFocus({ type: "focus" }));
      expect(result.current.touched).toBe(true);
    });
  });
});
