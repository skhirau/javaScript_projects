describe("Test Cases", function() {
  var operation = require('../../lib/jasmine_examples/Operations');

  describe("addition", function() {
    it("should successfully add two numbers", function() {
      var value = operation("XL", "X", "+");
      expect(value).toBe("L");
    });

    it("should successfully add two numbers", function() {
      var value = operation("C", "I", "-");
      expect(value).toBe("XCIX");
    });

    it("should successfully add two numbers", function() {
      var value = operation("C", "X", "/");
      expect(value).toBe("X");
    });

    it("should successfully add two numbers", function() {
      var value = operation("X", "X", "*");
      expect(value).toBe("C");
    });

    it("should exceeds the limit", function() {
      expect(function(){
        operation("MMMCMXCV", "CCXLVII", "+");
      }).toThrowError("Exceeds 3999");
    });

    it("should throw an error", function() {
      expect(function(){
        operation("YuSJKs", "CCXLVII", "+");
      }).toThrowError("Not Proper Values");
    });
  });

  describe("subtraction", function() {
    it("should successfully subtract two numbers", function() {
      var value = operation("CCCXXIV", "XLV", "-");
      expect(value).toBe("CCLXXIX");
    });

    it("should exceeds the limit", function() {
      expect(function(){
        operation("CCCXXIV", "MMMCMXCV", "-");
      }).toThrowError("Not a Valid Input");
    });

    it("should throw an error", function() {
      expect(function(){
        operation("YuSJKs", "CCXLVII", "-");
      }).toThrowError("Not Proper Values");
    });
  });

  describe("Multiplication", function() {
    it("should successfully multiply two numbers", function() {
      var value = operation("XXIII", "XCVI", "*");
      expect(value).toBe("MMCCVIII");
    });

    it("should exceeds the limit", function() {
      expect(function(){
        operation("CCCXCVI", "LXXXVI", "*");
      }).toThrowError("Exceeds 3999");
    });

    it("should throw an error", function() {
      expect(function(){
        operation("YuSJKs", "CCXLVII", "*");
      }).toThrowError("Not Proper Values");
    });
  });

  describe("Division", function() {
    it("should successfully divide two numbers", function() {
      var value = operation("MMMCXXV", "XXV", "/");
      expect(value).toBe("CXXV");
    });

    it("should exceeds the limit", function() {
      expect(function(){
        operation("CCCXCVI", "LXXXVI", "/");
      }).toThrowError("Not a Valid Input");
    });

    it("should throw an error", function() {
      expect(function(){
        operation("YuSJKs", "CCXLVII", "/");
      }).toThrowError("Not Proper Values");
    });
  });
});
