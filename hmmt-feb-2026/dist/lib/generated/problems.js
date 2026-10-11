"use strict";
// GENERATED FILE - do not edit.
// Source: data/hmmt_feb_2026.jsonl (projected from MathArena/hmmt_feb_2026, revision 02fba4f74d8e68e73e66a02d540fd979c05c274c).
// Upstream parquet data/train-00000-of-00001.parquet sha256: e5fcff6b1c2262841c0c37bf6d7b42529f284528d5f0d5c45c52e8bf0654a916
// Vendored hmmt_feb_2026.jsonl sha256: fbcd8e4f4325f98ec90c9064119c3f4f8b423de81b548643f43e0d725e5a71d4
// The 33 gold answers were cross-checked against the official HMMT February 2026
// published solutions (hmmt.org archive, February 14, 2026 sitting): all 33 agree.
// Problems originate from the HMMT February 2026 contest; see data/LICENSE-hmmt and NOTICE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROBLEMS = exports.PARQUET_SHA256 = exports.SOURCE_REVISION = exports.SOURCE_SHA256 = void 0;
exports.getProblem = getProblem;
exports.SOURCE_SHA256 = "fbcd8e4f4325f98ec90c9064119c3f4f8b423de81b548643f43e0d725e5a71d4";
exports.SOURCE_REVISION = "02fba4f74d8e68e73e66a02d540fd979c05c274c";
exports.PARQUET_SHA256 = "e5fcff6b1c2262841c0c37bf6d7b42529f284528d5f0d5c45c52e8bf0654a916";
exports.PROBLEMS = [
    {
        id: "HMMT/0",
        number: 1,
        problem: "A line intersects the graph of \\( y = x^2 + \\frac{2}{x} \\) at three distinct points. Given that the \\( x \\)-coordinates of two of the points are 6 and 7, respectively, compute the \\( x \\)-coordinate of the third point.",
        answer: "-\\frac{1}{21}",
        types: ["Algebra"]
    },
    {
        id: "HMMT/1",
        number: 2,
        problem: "Compute the second smallest positive integer \\( n \\) such that\n\n- \\( n \\) is divisible by 101, and\n- the decimal representation of \\( n \\) contains the number 2026 as a consecutive sequence of digits.",
        answer: "420261",
        types: ["Number Theory"]
    },
    {
        id: "HMMT/2",
        number: 3,
        problem: "Compute the sum of all positive integers \\( n \\) such that \\( n \\) has at least 6 positive integer divisors and the 6th largest divisor of \\( n \\) is 6.",
        answer: "48",
        types: ["Number Theory"]
    },
    {
        id: "HMMT/3",
        number: 4,
        problem: "Let \\( a, b, \\) and \\( c \\) be pairwise distinct complex numbers such that\n\n\\[\na^2 + ab + b^2 = 3(a + b),\n\\]\n\\[\na^2 + ac + c^2 = 3(a + c),\n\\]\n\\[\nb^2 + bc + c^2 = 5(b + c) + 1.\n\\]\n\nCompute \\( a \\).",
        answer: "\\frac{7}{2}",
        types: ["Algebra"]
    },
    {
        id: "HMMT/4",
        number: 5,
        problem: "Compute the largest positive integer \\( n \\) such that\n\n\\[\nn \\text{ divides } (\\lfloor \\sqrt{n} \\rfloor)!^{n!} + 450.\n\\]",
        answer: "1230",
        types: ["Number Theory"]
    },
    {
        id: "HMMT/5",
        number: 6,
        problem: "The numbers 1, 2, ..., 2100 are written on a board. Every second, Mark takes two numbers on the board, \\( a \\) and \\( b \\), erases them, and replaces them with \\( \\gcd(a, b) \\) and \\( \\operatorname{lcm}(a, b) \\). Mark stops once any move he makes will not change the numbers written on the board. Compute the number of divisors of the 2026th smallest positive integer written on the board when he finishes.",
        answer: "3840",
        types: ["Number Theory"]
    },
    {
        id: "HMMT/6",
        number: 7,
        problem: "Positive real numbers \\( x, y, \\) and \\( z \\) satisfy the following equations:\n\n\\[\nxyz = 3,\n\\]\n\\[\n(x-y)(y-z)(z-x) = 4,\n\\]\n\\[\n(x+y)(y+z)(z+x) = 40.\n\\]\n\nCompute the minimum possible value for \\( x \\).\n\nGive the minimum value of x as an exact expression using only integers, rational numbers, and radicals (no trigonometric or inverse trigonometric functions, and no approximations).",
        answer: "(3+\\sqrt{6})^{-1/3}",
        types: ["Algebra"]
    },
    {
        id: "HMMT/7",
        number: 8,
        problem: "Let \\( a_0, a_1, a_2, \\ldots \\) be the unique sequence of nonnegative integers less than 397 with \\( a_0 = 1 \\) and\n\n\\[ a_{n+1}(a_n + 1)^2 \\equiv a_n \\pmod{397} \\]\n\nfor all nonnegative integers \\( n \\). Given that \\( a_{2026} = 9 \\), compute the remainder when \\( a_0 + a_1 + \\cdots + a_{2026} \\) is divided by 397.",
        answer: "279",
        types: ["Number Theory"]
    },
    {
        id: "HMMT/8",
        number: 9,
        problem: "Compute\n\n\\[ \\sum_{k=1}^{\\infty} \\left( 2^{-\\lfloor 101k/1 \\rfloor} + 2^{-\\lfloor 101k/2 \\rfloor} + \\cdots + 2^{-\\lfloor 101k/100 \\rfloor} \\right). \\]",
        answer: "50(1 - \\frac{1}{2^{101} - 1})",
        types: ["Algebra"]
    },
    {
        id: "HMMT/9",
        number: 10,
        problem: "Let\n\n\\[ S = \\sum_{k=0}^{2026} k \\binom{2k}{k} 2^k. \\]\n\nCompute the remainder when \\( S \\) is divided by 2027. (Note that 2027 is prime.)",
        answer: "289",
        types: ["Number Theory"]
    },
    {
        id: "HMMT/10",
        number: 11,
        problem: "A math test has 4 questions. The topic of each question is randomly and independently chosen from algebra, combinatorics, geometry, and number theory. Given that the math test has at least one algebra question, at least one combinatorics question, and at least one geometry question, compute the probability that this test has at least one number theory question.",
        answer: "\\frac{2}{5}",
        types: ["Combinatorics"]
    },
    {
        id: "HMMT/11",
        number: 12,
        problem: "Jacopo is rolling a fair 4-sided die with faces labeled 1, 2, 3, and 4. He starts with a score of 0. Every time he rolls a face with label $i$, he adds $i$ to his score, and then replaces the label of that face with 0. Compute Jacopo's expected score after 4 rolls.",
        answer: "\\frac{875}{128}",
        types: ["Combinatorics"]
    },
    {
        id: "HMMT/12",
        number: 13,
        problem: "The numbers 1, 2, 3, 4, 5, 6, and 7 are written on a blackboard in some order. Jacob repeatedly swaps numbers at adjacent positions on the blackboard until the numbers are sorted in ascending order.\n\nCompute the number of initial orderings for which it is possible that the number 4 was included in a swap at most once.",
        answer: "324",
        types: ["Combinatorics"]
    },
    {
        id: "HMMT/13",
        number: 14,
        problem: "Sarunyu has a stick of length 1 with one endpoint marked in red. Every minute, he picks one of his sticks uniformly at random and breaks it into two halves of equal length. Compute the expected length of the stick with the red endpoint after 5 minutes.",
        answer: "\\frac{63}{256}",
        types: ["Combinatorics"]
    },
    {
        id: "HMMT/14",
        number: 15,
        problem: "Let $S$ be the set of positive integer divisors of $10^9$. Compute the number of subsets $T$ of $S$ such that\n\n- for every element $s$ of $S$, exactly one of $s$ and $10^9/s$ is in $T$, and\n- for every element $t$ of $T$, all positive integer divisors of $t$ are in $T$.",
        answer: "252",
        types: ["Combinatorics", "Number Theory"]
    },
    {
        id: "HMMT/15",
        number: 16,
        problem: "Derek currently owes $\\pi$ units of a currency called Money of Indiscrete Type, or MIT for short. Every day, the following happens:\n\n- He flips a fair coin to decide how much of his debt to pay. If he flips heads, he decreases his debt by 1 MIT. If he flips tails, he decreases his debt by 2 MITs. If Derek's debt ever becomes nonpositive, Derek becomes debt-free.\n- Afterwards, his remaining debt doubles.\n\nCompute the probability that Derek ever becomes debt-free. (MITs are continuous, so the debt is never rounded.)",
        answer: "2 - \\frac{\\pi}{2}",
        types: ["Combinatorics"]
    },
    {
        id: "HMMT/16",
        number: 17,
        problem: "Let $S$ be the set of vertices of a right prism whose bases are regular decagons $A_1A_2 \\ldots A_{10}$ and $B_1B_2 \\ldots B_{10}$. A plane, not passing through any vertex of $S$, partitions the vertices of $S$ into two sets, one of which is $M$. Compute the number of possible sets $M$ that can arise out of such a partition.",
        answer: "1574",
        types: ["Combinatorics", "Geometry"]
    },
    {
        id: "HMMT/17",
        number: 18,
        problem: "A regular hexagon with side length 4 is subdivided into a lattice of 96 equilateral triangles of side length 1. Let $S$ be the set of all vertices of this lattice. Compute the number of nondegenerate triangles with vertices in $S$ that contain the center of the hexagon strictly in their interior.",
        answer: "6992",
        types: ["Combinatorics", "Geometry"]
    },
    {
        id: "HMMT/18",
        number: 19,
        problem: "Let \\( A_1, A_2, A_3, \\ldots \\) be a sequence of finite nonempty sets of positive integers. Given that \\( |A_i \\cap A_j| = \\gcd(i, j) \\) for all (not necessarily distinct) positive integers \\( i \\) and \\( j \\), compute the minimum possible value of\n\n\\[\n\\sum_{d|250} \\max A_d,\n\\]\n\nwhere the sum ranges over all positive integer divisors \\( d \\) of 250.\n\n(For a finite nonempty set \\( S \\), we define \\( \\max S \\) as the largest element of \\( S \\).)",
        answer: "499",
        types: ["Combinatorics", "Number Theory"]
    },
    {
        id: "HMMT/19",
        number: 20,
        problem: "Let \\(S\\) be the set of all ordered pairs \\((x, y)\\) of nonnegative integers \\(0 \\leq x \\leq 19\\) and \\(0 \\leq y \\leq 2\\). Compute the number of permutations \\((x_1, y_1)\\), \\((x_2, y_2)\\), ..., \\((x_{60}, y_{60})\\) of the elements of \\(S\\) such that\n\n- \\(y_1 = 2\\) and \\(y_{60} = 0\\);\n- for all nonnegative integers \\(1 \\leq i \\leq 59\\), exactly one of the following holds:\n  - \\(x_i = x_{i+1}\\) and \\(|y_i - y_{i+1}| = 1\\),\n  - \\(y_i = y_{i+1}\\) and \\(x_i - x_{i+1}\\) is \\(-1\\) or \\(19\\).",
        answer: "20460",
        types: ["Combinatorics"]
    },
    {
        id: "HMMT/20",
        number: 21,
        problem: "Let $ABCD$ and $WXYZ$ be squares such that $W$ lies on segment $\\overline{AD}$, $X$ lies on segment $\\overline{AB}$, and points $Y$ and $Z$ lie strictly inside $ABCD$. Given that $AW = 4$, $AX = 5$, and $AB = 12$, compute the area of triangle $\\triangle BCY$.",
        answer: "18",
        types: ["Geometry"]
    },
    {
        id: "HMMT/21",
        number: 22,
        problem: "Let $HORSE$ be a convex pentagon such that $\\angle EHO = \\angle ORS = \\angle SEH = 90^\\circ$ and $\\angle HOR = \\angle RSE = 135^\\circ$. Given that $HO = 20$, $SE = 26$, and $OS = 10$, compute the area of $HORSE$.",
        answer: "191",
        types: ["Geometry"]
    },
    {
        id: "HMMT/22",
        number: 23,
        problem: "Let \\( ABCD \\) be a rectangle with \\( AB = 12 \\) and \\( BC = 16 \\). Points \\( W, X, Y, \\) and \\( Z \\) lie on sides \\( \\overline{AB}, \\overline{BC}, \\overline{CD}, \\) and \\( \\overline{DA} \\), respectively, such that \\( WXYZ \\) is a rhombus with area 120. Compute \\( XY \\).",
        answer: "5\\sqrt{5}",
        types: ["Geometry"]
    },
    {
        id: "HMMT/23",
        number: 24,
        problem: "Let \\( ABC \\) be a triangle with \\( \\angle BAC = 90^\\circ \\). Points \\( X \\) and \\( Y \\) are such that \\( B, X, Y, \\) and \\( C \\) lie on segment \\( \\overline{BC} \\) in that order, \\( BX = 4, XY = 5, \\) and \\( YC = 3 \\). Let \\( T \\) be a point lying on segment \\( \\overline{AC} \\) such that \\( TA = TX = TY = \\ell \\) for some \\( \\ell \\). Compute \\( \\ell \\).",
        answer: "\\frac{7}{3}\\sqrt{3}",
        types: ["Geometry"]
    },
    {
        id: "HMMT/24",
        number: 25,
        problem: "Three circles of radius 2 are internally tangent to a circle $\\Omega$ centered at $O$ of radius 11, and three chords of $\\Omega$ are each tangent to two of the three circles. Given that $O$ lies inside the triangle formed by the three chords and two of the chords have length $4\\sqrt{30}$, compute the length of the third chord.",
        answer: "8\\sqrt{6}",
        types: ["Geometry"]
    },
    {
        id: "HMMT/25",
        number: 26,
        problem: "Let \\(ABC\\) be a triangle, and \\(M\\) be the midpoint of segment \\(\\overline{BC}\\). Points \\(P\\) and \\(Q\\) lie on segments \\(\\overline{AB}\\) and \\(\\overline{AC}\\), respectively, so that \\(\\angle PMB = \\angle QMC = \\frac{1}{2}\\angle BAC\\). Given that \\(AP = 1\\), \\(AQ = 3\\), and \\(BC = 8\\), compute \\(BP\\).",
        answer: "\\sqrt{17} - 1",
        types: ["Geometry"]
    },
    {
        id: "HMMT/26",
        number: 27,
        problem: "Let \\( ABC \\) be an isosceles triangle with \\( AB = AC \\). Points \\( P \\) and \\( Q \\) are located inside triangle \\( ABC \\) such that \\( BP = PQ = QC \\). Suppose that \\( \\angle BAP = 20^\\circ \\), \\( \\angle PAQ = 46^\\circ \\), and \\( \\angle QAC = 26^\\circ \\). Compute the measure of \\( \\angle APC \\) in degrees.",
        answer: "74^\\circ",
        types: ["Geometry"]
    },
    {
        id: "HMMT/27",
        number: 28,
        problem: "Let $ABC$ be a triangle with orthocenter $H$. The internal angle bisector of $\\angle BAC$ meets the circumcircles of triangles $ABH$, $ACH$, and $ABC$ again at points $P$, $Q$, and $M$, respectively. Suppose that points $A$, $P$, $Q$, and $M$ are distinct and lie on the internal angle bisector of $\\angle BAC$ in that order. Given that $AP = 4$, $AQ = 5$, and $BC = 7$, compute $AM$.",
        answer: "\\sqrt{69}",
        types: ["Geometry"]
    },
    {
        id: "HMMT/28",
        number: 29,
        problem: "Let $ABC$ be triangle with incenter $I$ and incircle $\\omega$. The circumcircle of triangle $BIC$ intersects $\\omega$ at points $E$ and $F$. Suppose that $\\Gamma \\neq \\omega$ is a circle passing through $E$ and $F$ and tangent to lines $AB$ and $AC$. If $AB = 5$, $AC = 7$, and $\\Gamma$ has twice the radius of $\\omega$, compute $BC$.",
        answer: "3 + \\sqrt{11}",
        types: ["Geometry"]
    },
    {
        id: "HMMT/29",
        number: 30,
        problem: "Let $ABC$ be a triangle with centroid $G$ and circumcenter $O$. Suppose that the orthocenter of triangle $AGO$ lies on line $BC$. Given that $AB = 11$ and $AC = 13$, compute $BC$.",
        answer: "\\frac{\\sqrt{1740}}{3}",
        types: ["Geometry"]
    },
    {
        id: "HMMT/30",
        number: 31,
        problem: "Jessica the jackrabbit wants to climb down a wall. The wall consists of 2026 horizontal layers stacked vertically. The $n$th layer from the top is partitioned into $2^n - 1$ identical rectangular bricks arranged side by side. Jessica begins in the topmost layer, which contains a single brick. A move consists of Jessica going down one layer to a brick that shares a side with the brick she is currently on.\n\nDetermine, with proof, the total number of distinct sequences of moves Jessica can take to reach the 2026th layer.",
        answer: "3^{2025}",
        types: ["Combinatorics"]
    },
    {
        id: "HMMT/31",
        number: 32,
        problem: "Let $\\alpha$ and $\\beta$ be complex numbers such that $\\alpha\\beta + \\alpha + \\beta + 100 = 0$. Suppose that $|\\alpha| = |\\beta| = M$ for some nonnegative real number $M$. Determine, with proof, all possible values of $M$.\n\nOutput your answer as a comma-separated list of all possible values of $M$. For instance, if you believe 0,1, and 2 are the possible values, format you reply as \\\\boxed{0,1,2}",
        answer: "10",
        types: ["Algebra"]
    },
    {
        id: "HMMT/32",
        number: 33,
        problem: "The numbers 1, 2, ..., 2026 are written on a blackboard. An operation consists of replacing any number on the blackboard with the positive difference between the largest and smallest numbers currently on the blackboard. Determine, with proof, the least number of operations required to make all the numbers on the blackboard equal.",
        answer: "3037",
        types: ["Combinatorics"]
    },
];
function getProblem(id) {
    return exports.PROBLEMS.find((problem) => problem.id === id);
}
