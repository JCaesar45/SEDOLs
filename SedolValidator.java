public class SedolValidator {

    private static final int[] WEIGHTS = {1, 3, 1, 7, 3, 9};
    private static final String VALID_CHARS = "0123456789BCDFGHJKLMNPQRSTVWXYZ";

    private static int charValue(char c) {
        if (Character.isDigit(c)) return c - '0';
        return c - 'A' + 10;
    }

    public static String complete(String base) {
        if (base == null || base.length() != 6) return null;
        String upper = base.toUpperCase();
        int sum = 0;
        for (int i = 0; i < 6; i++) {
            char c = upper.charAt(i);
            if (VALID_CHARS.indexOf(c) == -1) return null;
            sum += charValue(c) * WEIGHTS[i];
        }
        int digit = (10 - (sum % 10)) % 10;
        return upper + digit;
    }

    public static void main(String[] args) {
        String[] tests = {"710889", "B0YBKJ", "B00030", "BOATER"};
        for (String t : tests) {
            System.out.println(t + " -> " + complete(t));
        }
    }
}
