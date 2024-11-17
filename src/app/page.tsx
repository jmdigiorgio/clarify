import Header from '../components/Header';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function Home() {
  const markdownContent = `

# **Clarify**  
> *The quality of being easily understood.*  
> *The state of having a full, detailed, and orderly grasp of something.*

---

### Requirements management doesn’t have to be chaos.  

For large systems, there are inevitably:  

- **Hundreds of specs**  
- **Countless dependencies**  
- **An endless loop of tracking, tracing, and validating**

The result? Exhaustion. Frustration. Missed deadlines.  
And let’s face it—old tools just aren’t cutting it anymore.  

---

### It’s time to modernize.  

Meet **Clarify**:  
A smarter solution that transforms requirements management from a burden into a breeze.  

---

### **Clarify complexity.**  
_Because managing requirements hasn’t been simple in the past—  
but now, simplicity is within reach._  

---


`;

  return (
    <div className="min-h-screen bg-primary text-gray-900">
      <Header />
      <main className="prose prose-lg max-w-prose mx-auto p-4">
        <MarkdownRenderer markdown={markdownContent} />
      </main>
    </div>
  );
}
