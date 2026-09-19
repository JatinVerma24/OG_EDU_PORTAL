'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Printer,
  BookOpen,
  Code,
  Layers,
  Database,
  Calculator,
  ArrowRight
} from 'lucide-react';

export default function MidtermCheatSheetsPage() {
  const [activeSubject, setActiveSubject] = useState<'dsa' | 'python' | 'maths' | 'dbms'>('dsa');

  const subjects = [
    { id: 'dsa', name: 'Data Structures (CSE205)', icon: Layers, color: 'text-amber-400' },
    { id: 'python', name: 'Python Programming (INT108)', icon: Code, color: 'text-emerald-400' },
    { id: 'maths', name: 'Engineering Maths (MTH166/302)', icon: Calculator, color: 'text-sky-400' },
    { id: 'dbms', name: 'DBMS Fundamentals (CSE326)', icon: Database, color: 'text-purple-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 print:hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 border border-rose-500/30 text-rose-300">
          <FileText className="w-3.5 h-3.5" />
          <span>1-Page Printable Quick Revision Summaries</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          High-Yield Mid-Term Cheat Sheets
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Condensed, zero-fluff revision sheets formatted for night-before cramming and morning-of exam recall.
        </p>

        <div className="pt-2">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-600/20 transition-all inline-flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Current Cheat Sheet (Clean PDF)
          </button>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-surface-border print:hidden">
        {subjects.map((sub) => {
          const Icon = sub.icon;
          const isSelected = activeSubject === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubject(sub.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-surface-card text-white border border-surface-border shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-surface-elevated/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${sub.color}`} />
              {sub.name}
            </button>
          );
        })}
      </div>

      {/* Cheat Sheet Content Card */}
      <div className="p-6 sm:p-10 rounded-2xl bg-surface-card border border-surface-border print:border-none print:p-0 print:bg-white print:text-black space-y-8">
        {/* DSA SHEET */}
        {activeSubject === 'dsa' && (
          <div className="space-y-8">
            <div className="border-b border-surface-border/60 pb-4">
              <h2 className="text-xl sm:text-2xl font-black font-display text-white print:text-black">
                Data Structures & Algorithms (Units 1-3) &middot; Midterm Cheat Sheet
              </h2>
              <p className="text-xs text-zinc-400 print:text-zinc-600">
                Covers Asymptotic Notation, Linear Arrays, Linked Lists, Stacks, Queues, and Infix/Postfix Parsing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              {/* Box 1: Time Complexities */}
              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-amber-400 print:text-amber-800 uppercase tracking-wide">
                  1. Essential Time Complexities
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full font-mono text-[11px]">
                    <thead className="text-zinc-400 border-b border-zinc-800">
                      <tr><th>Structure</th><th>Access</th><th>Search</th><th>Insertion</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
                      <tr><td>Array</td><td>O(1)</td><td>O(n)</td><td>O(n)</td></tr>
                      <tr><td>Singly Linked List</td><td>O(n)</td><td>O(n)</td><td>O(1) at head</td></tr>
                      <tr><td>Stack (LIFO)</td><td>O(n)</td><td>O(n)</td><td>O(1) Push/Pop</td></tr>
                      <tr><td>Queue (FIFO)</td><td>O(n)</td><td>O(n)</td><td>O(1) Enqueue</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Box 2: Infix to Postfix Algorithm */}
              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-rose-400 print:text-rose-800 uppercase tracking-wide">
                  2. Infix to Postfix Parsing (Stack)
                </h3>
                <ol className="list-decimal pl-4 space-y-1 text-zinc-300 print:text-black font-mono text-[11px]">
                  <li>Scan token left to right.</li>
                  <li>If Operand &rarr; Output directly to postfix string.</li>
                  <li>If '(' &rarr; Push onto stack.</li>
                  <li>If ')' &rarr; Pop from stack to output until '(' is encountered. Discard '('.</li>
                  <li>If Operator &rarr; Pop operators of greater/equal precedence, then push current operator.</li>
                </ol>
              </div>

              {/* Box 3: Circular Queue & Pointers */}
              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-wide">
                  3. Circular Queue Pointers
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-zinc-300 print:text-black font-mono text-[11px]">
                  <li><strong>Queue Full:</strong> `(rear + 1) % MAX == front`</li>
                  <li><strong>Queue Empty:</strong> `front == -1`</li>
                  <li><strong>Enqueue:</strong> <code>rear = (rear + 1) % MAX; arr[rear] = val;</code></li>
                  <li><strong>Dequeue:</strong> <code>val = arr[front]; if (front == rear) &#123; front = rear = -1; &#125; else &#123; front = (front + 1) % MAX; &#125;</code></li>
                </ul>
              </div>

              {/* Box 4: Singly vs Doubly vs Circular Lists */}
              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-sky-400 print:text-sky-800 uppercase tracking-wide">
                  4. Linked List Edge Cases
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-zinc-300 print:text-black text-[11px]">
                  <li><strong>Insert at Beginning:</strong> <code>newNode-&gt;next = head; head = newNode;</code></li>
                  <li><strong>Delete at End:</strong> Traverse with two pointers (<code>curr</code>, <code>prev</code>) until <code>curr-&gt;next == NULL</code>. Set <code>prev-&gt;next = NULL</code>.</li>
                  <li>Always check if <code>head == NULL</code> (Underflow guard) before accessing <code>head-&gt;next</code>.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PYTHON SHEET */}
        {activeSubject === 'python' && (
          <div className="space-y-8">
            <div className="border-b border-surface-border/60 pb-4">
              <h2 className="text-xl sm:text-2xl font-black font-display text-white print:text-black">
                Python Programming (INT108) &middot; Midterm Cheat Sheet
              </h2>
              <p className="text-xs text-zinc-400 print:text-zinc-600">
                Slicing syntax, List comprehensions, Dict operations, Lambda, and tricky output prediction questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-emerald-400 uppercase tracking-wide">1. String & List Slicing Rules</h3>
                <div className="font-mono text-[11px] bg-surface-elevated p-3 rounded-lg text-zinc-200">
                  <p>s = "PROGRAMMING"</p>
                  <p>s[0:4]   # "PROG" (index 0 to 3)</p>
                  <p>s[::-1]  # "GNIMMARGORP" (Reverse string)</p>
                  <p>s[-4:]   # "MING" (Last 4 chars)</p>
                  <p>s[::2]   # "PORMIG" (Step by 2)</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-amber-400 uppercase tracking-wide">2. Mutable vs Immutable Types</h3>
                <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-zinc-300">
                  <li><strong>Immutable:</strong> int, float, str, tuple, frozenset (cannot modify in-place).</li>
                  <li><strong>Mutable:</strong> list, dict, set (can modify in-place).</li>
                  <li>Tricky question: `t = (1, [2, 3])` &rarr; `t[1].append(4)` works! But `t[0] = 5` throws TypeError!</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-rose-400 uppercase tracking-wide">3. List & Dict Comprehension</h3>
                <div className="font-mono text-[11px] bg-surface-elevated p-3 rounded-lg text-zinc-200 space-y-1">
                  <p># Evens squared: [x**2 for x in range(10) if x % 2 == 0]</p>
                  <p># Word lengths: &#123;w: len(w) for w in [&quot;cat&quot;, &quot;elephant&quot;]&#125;</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-sky-400 uppercase tracking-wide">4. Lambda & Filter / Map</h3>
                <div className="font-mono text-[11px] bg-surface-elevated p-3 rounded-lg text-zinc-200 space-y-1">
                  <p>sq = lambda x: x * x</p>
                  <p>evens = list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4]))</p>
                  <p>doubled = list(map(lambda x: x * 2, [1, 2, 3]))</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MATHS SHEET */}
        {activeSubject === 'maths' && (
          <div className="space-y-8">
            <div className="border-b border-surface-border/60 pb-4">
              <h2 className="text-xl sm:text-2xl font-black font-display text-white print:text-black">
                Engineering Mathematics (MTH166/302) &middot; Midterm Cheat Sheet
              </h2>
              <p className="text-xs text-zinc-400 print:text-zinc-600">
                Matrices, Eigenvalues, Cayley-Hamilton Theorem, Partial Derivatives & Lagrange Multipliers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-sky-400 uppercase tracking-wide">1. Eigenvalues & Eigenvectors</h3>
                <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-zinc-300">
                  <li>Characteristic equation: `|A - &lambda;I| = 0`</li>
                  <li><strong>Trace Property:</strong> Sum of Eigenvalues = Sum of diagonal elements of A.</li>
                  <li><strong>Determinant Property:</strong> Product of Eigenvalues = det(A).</li>
                  <li>Eigenvalues of symmetric real matrices are always real!</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-amber-400 uppercase tracking-wide">2. Cayley-Hamilton Theorem</h3>
                <p className="text-[11px] text-zinc-300">
                  Every square matrix satisfies its own characteristic equation:
                </p>
                <div className="font-mono text-[11px] bg-surface-elevated p-2 rounded text-zinc-200">
                  If |A - &lambda;I| = &lambda;&sup2; - 5&lambda; + 6 = 0, then:
                  A&sup2; - 5A + 6I = 0  =&gt;  A&macr;&sup1; = 1/6 (5I - A)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-rose-400 uppercase tracking-wide">3. Maxima / Minima in 2 Variables</h3>
                <ul className="list-disc pl-4 space-y-1 text-zinc-300 font-mono text-[11px]">
                  <li>Let r = f_xx, s = f_xy, t = f_yy at critical point (a,b).</li>
                  <li>If <strong>rt - s&sup2; &gt; 0</strong> and <strong>r &lt; 0</strong> &rarr; Local Maximum.</li>
                  <li>If <strong>rt - s&sup2; &gt; 0</strong> and <strong>r &gt; 0</strong> &rarr; Local Minimum.</li>
                  <li>If <strong>rt - s&sup2; &lt; 0</strong> &rarr; Saddle Point (neither max nor min).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-emerald-400 uppercase tracking-wide">4. Euler's Theorem for Homogeneous Functions</h3>
                <p className="text-[11px] text-zinc-300">
                  If u = f(x, y) is a homogeneous function of degree n:
                </p>
                <div className="font-mono text-[11px] bg-surface-elevated p-2 rounded text-zinc-200">
                  x(&part;u/&part;x) + y(&part;u/&part;y) = n &middot; u
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DBMS SHEET */}
        {activeSubject === 'dbms' && (
          <div className="space-y-8">
            <div className="border-b border-surface-border/60 pb-4">
              <h2 className="text-xl sm:text-2xl font-black font-display text-white print:text-black">
                Database Management Systems &middot; Midterm Cheat Sheet
              </h2>
              <p className="text-xs text-zinc-400 print:text-zinc-600">
                ER modeling, Relational Algebra, Functional Dependencies, and Normalization (1NF to BCNF)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-purple-400 uppercase tracking-wide">1. Normalization Steps (1NF &rarr; BCNF)</h3>
                <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-zinc-300">
                  <li><strong>1NF:</strong> Atomic attributes only (No multivalued/composite attributes).</li>
                  <li><strong>2NF:</strong> 1NF + No Partial Dependency (All non-key attrs depend on whole candidate key).</li>
                  <li><strong>3NF:</strong> 2NF + No Transitive Dependency (X &rarr; Y, X is superkey OR Y is prime attribute).</li>
                  <li><strong>BCNF:</strong> For every X &rarr; Y, X must strictly be a Super Key!</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-amber-400 uppercase tracking-wide">2. Relational Algebra Operators</h3>
                <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-zinc-300">
                  <li>&sigma;_c (R): Selection (filters rows satisfying condition c).</li>
                  <li>&Pi;_A (R): Projection (selects specified columns A).</li>
                  <li>R &times; S: Cartesian Product (all combined pairs).</li>
                  <li>R &bowtie;_c S: Theta / Natural Join (Cartesian product filtered by condition).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-emerald-400 uppercase tracking-wide">3. ACID Properties</h3>
                <ul className="list-disc pl-4 space-y-1 text-zinc-300 text-[11px]">
                  <li><strong>Atomicity:</strong> All-or-nothing execution of transactions (managed by Recovery manager / Undo log).</li>
                  <li><strong>Consistency:</strong> Preserves DB integrity constraints.</li>
                  <li><strong>Isolation:</strong> Concurrent transactions execute as if sequential (managed by Concurrency Control).</li>
                  <li><strong>Durability:</strong> Once committed, updates persist even after system crash (managed by Redo log).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-surface-base/80 border border-surface-border print:border print:border-zinc-300 space-y-2">
                <h3 className="font-bold text-sky-400 uppercase tracking-wide">4. SQL Query Order of Execution</h3>
                <p className="font-mono text-[11px] bg-surface-elevated p-2 rounded text-zinc-200">
                  FROM &rarr; JOIN &rarr; WHERE &rarr; GROUP BY &rarr; HAVING &rarr; SELECT &rarr; DISTINCT &rarr; ORDER BY &rarr; LIMIT
                </p>
                <p className="text-[10px] text-zinc-400">
                  Common exam trap: WHERE cannot contain aggregate functions (COUNT, AVG); use HAVING instead!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
