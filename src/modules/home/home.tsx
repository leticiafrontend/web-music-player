import { zodResolver } from '@hookform/resolvers/zod'
import {
  Atom,
  Book,
  BracketsCurly,
  Database,
  FileCode,
  FileTs,
  GitCommit,
  Lightning,
  Link,
  PaintBucket,
  Shield,
  Sparkle,
  Wrench,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useGetUser } from '@services/user'
import { useStore } from '@stores/user'

const formSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  email: z.string().email('Invalid email'),
})

type FormData = z.infer<typeof formSchema>

type Tab = {
  id: string
  title: string
  icon: React.ReactNode
}

export const Home = () => {
  const { getUser, isLoading, error } = useGetUser()
  const bears = useStore((state) => state.bears)
  const [activeTab, setActiveTab] = useState('dev-tools')
  const [typingComplete, setTypingComplete] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const tabs: Tab[] = [
    { id: 'dev-tools', title: 'Dev Tools', icon: <Wrench weight="duotone" /> },
    { id: 'zustand', title: 'Zustand', icon: <Database weight="duotone" /> },
    {
      id: 'framer-motion',
      title: 'Framer Motion',
      icon: <Sparkle weight="duotone" />,
    },
    {
      id: 'react-hook-form',
      title: 'React Hook Form',
      icon: <FileCode weight="duotone" />,
    },
    {
      id: 'react-query',
      title: 'TanStack Query',
      icon: <Atom weight="duotone" />,
    },
    {
      id: 'documentation',
      title: 'Documentation',
      icon: <Book weight="duotone" />,
    },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-900 to-zinc-800 px-5 pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 min-h-[4rem]">
            {'React Vite Boilerplate'.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.05,
                  delay: index * 0.08,
                  onComplete:
                    index === 'React Vite Boilerplate'.length - 1
                      ? () => setTimeout(() => setTypingComplete(true), 300)
                      : undefined,
                }}
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h2
            className="text-2xl font-semibold text-white mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: typingComplete ? 1 : 0,
              y: typingComplete ? 0 : 10,
            }}
            transition={{ duration: 0.5 }}
          >
            A modern React starter kit with all the tools you need to build
            amazing applications
          </motion.h2>
          <motion.p
            className="text-xl text-zinc-300 max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: typingComplete ? 1 : 0,
              y: typingComplete ? 0 : 10,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Interactive demonstration of the features included in this
            boilerplate
          </motion.p>
          <a
            href="https://github.com/leticiafrontend/react-vite-boilerplate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 border border-zinc-700 shadow-md"
          >
            <GitCommit size={20} weight="duotone" />
            View on GitHub
          </a>
        </div>

        <div className="mb-8">
          <div className="flex justify-center mb-1">
            <motion.div
              className="bg-zinc-800/50 p-1 rounded-xl backdrop-blur-sm border border-zinc-700/50 flex gap-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === tab.id ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    <span>{tab.icon}</span>
                    {tab.title}
                  </span>
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-lg -z-10"
                      layoutId="activeTab"
                      initial={{ borderRadius: 8 }}
                      animate={{ borderRadius: 8 }}
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="bg-zinc-800/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-700/50 shadow-xl h-[600px] overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'dev-tools' && (
              <motion.div
                key="dev-tools"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-white h-full overflow-y-auto pr-2 custom-scrollbar"
              >
                <div className="flex flex-col items-center gap-6 p-4">
                  <h2 className="text-3xl font-bold text-center flex items-center gap-2">
                    Development Tools
                  </h2>
                  <p className="text-zinc-300 text-center max-w-2xl mb-4">
                    This boilerplate includes a comprehensive set of modern
                    development tools to enhance your workflow.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    <motion.div
                      className="bg-zinc-700/50 p-5 rounded-lg flex flex-col gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-2 rounded-lg">
                          <Lightning size={24} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-semibold">Vite</h3>
                      </div>
                      <p className="text-zinc-300 text-sm">
                        A modern build tool that provides an extremely fast
                        development experience with instant server start,
                        lightning-fast HMR (Hot Module Replacement), and
                        optimized builds.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-zinc-700/50 p-5 rounded-lg flex flex-col gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-lg">
                          <Atom size={24} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-semibold">React</h3>
                      </div>
                      <p className="text-zinc-300 text-sm">
                        A JavaScript library for building user interfaces with a
                        component-based architecture, virtual DOM for efficient
                        rendering, and a rich ecosystem of libraries and tools.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-zinc-700/50 p-5 rounded-lg flex flex-col gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded-lg">
                          <FileTs size={24} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-semibold">TypeScript</h3>
                      </div>
                      <p className="text-zinc-300 text-sm">
                        A strongly typed programming language that builds on
                        JavaScript, giving you better tooling at any scale,
                        catching errors early, and enhancing developer
                        experience with IDE support.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-zinc-700/50 p-5 rounded-lg flex flex-col gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-2 rounded-lg">
                          <PaintBucket size={24} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-semibold">Tailwind CSS3</h3>
                      </div>
                      <p className="text-zinc-300 text-sm">
                        A utility-first CSS framework that allows for rapid UI
                        development with pre-defined classes that can be
                        composed to build any design directly in your markup.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-zinc-700/50 p-5 rounded-lg flex flex-col gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-2 rounded-lg">
                          <BracketsCurly size={24} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-semibold">ESLint</h3>
                      </div>
                      <p className="text-zinc-300 text-sm">
                        A static code analysis tool for identifying problematic
                        patterns in JavaScript code, ensuring code consistency
                        and avoiding bugs.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-zinc-700/50 p-5 rounded-lg flex flex-col gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-pink-500 to-pink-700 p-2 rounded-lg">
                          <Sparkle size={24} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-semibold">Prettier</h3>
                      </div>
                      <p className="text-zinc-300 text-sm">
                        An opinionated code formatter that enforces a consistent
                        style by parsing your code and re-printing it with its
                        own rules, ensuring your codebase looks the same
                        regardless of who wrote it.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-zinc-700/50 p-5 rounded-lg flex flex-col gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-red-500 to-red-700 p-2 rounded-lg">
                          <Shield size={24} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-semibold">Husky</h3>
                      </div>
                      <p className="text-zinc-300 text-sm">
                        A tool that allows you to run scripts (like linting and
                        testing) before commits are made, ensuring that your
                        code meets quality standards before being committed.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-zinc-700/50 p-5 rounded-lg flex flex-col gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-green-500 to-green-700 p-2 rounded-lg">
                          <GitCommit size={24} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-semibold">Commitlint</h3>
                      </div>
                      <p className="text-zinc-300 text-sm">
                        A tool that enforces a conventional commit message
                        format, making it easier to generate changelogs and
                        navigate project history.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-zinc-700/50 p-5 rounded-lg flex flex-col gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-2 rounded-lg">
                          <Link size={24} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          React Router DOM
                        </h3>
                      </div>
                      <p className="text-zinc-300 text-sm">
                        A collection of navigational components that compose
                        declaratively with your application, allowing you to
                        implement dynamic routing in a web app.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-zinc-700/50 p-5 rounded-lg flex flex-col gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 p-2 rounded-lg">
                          <Sparkle size={24} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          Phosphor Icons
                        </h3>
                      </div>
                      <p className="text-zinc-300 text-sm">
                        A flexible icon family for interfaces, diagrams,
                        presentations — whatever, really. Highly customizable
                        and easy to use.
                      </p>
                    </motion.div>
                  </div>

                  <div className="bg-zinc-800/80 p-4 rounded-lg mt-4 w-full max-w-3xl">
                    <h3 className="text-lg font-semibold mb-2">
                      Development Workflow
                    </h3>
                    <p className="text-zinc-300 text-sm mb-3">
                      This boilerplate provides a streamlined development
                      workflow with automated quality checks:
                    </p>
                    <ul className="list-disc pl-5 text-zinc-300 text-sm space-y-2">
                      <li>
                        <strong>Lint-Staged:</strong> Runs linters on staged
                        files to catch errors before they're committed
                      </li>
                      <li>
                        <strong>Husky:</strong> Executes pre-commit hooks to
                        ensure code quality
                      </li>
                      <li>
                        <strong>Commitlint:</strong> Validates commit messages
                        to maintain a consistent commit history
                      </li>
                      <li>
                        <strong>ESLint + Prettier:</strong> Enforces code style
                        and catches potential issues
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'zustand' && (
              <motion.div
                key="zustand"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-white h-full overflow-y-auto pr-2 custom-scrollbar"
              >
                <div className="flex flex-col items-center gap-6 p-4">
                  <h2 className="text-3xl font-bold text-center flex items-center gap-2">
                    Zustand State Management
                  </h2>
                  <p className="text-zinc-300 text-center max-w-2xl mb-4">
                    Zustand is a minimalist and easy-to-use state management
                    library.
                  </p>

                  <motion.div
                    className="bg-zinc-700/50 p-6 rounded-lg flex flex-col items-center gap-4 w-full max-w-md"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <p className="text-4xl font-bold">{bears}</p>
                    <p className="text-zinc-300">Bears in global state</p>
                    <div className="flex gap-3">
                      <motion.button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium"
                        onClick={() => useStore.setState({ bears: bears + 1 })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add Bear
                      </motion.button>
                      <motion.button
                        className="bg-zinc-600 text-white px-6 py-2 rounded-lg font-medium"
                        onClick={() => useStore.setState({ bears: 0 })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={bears === 0}
                      >
                        Reset
                      </motion.button>
                    </div>
                  </motion.div>

                  <div className="bg-zinc-800/80 p-4 rounded-lg mt-4 w-full max-w-md">
                    <pre className="text-sm text-zinc-300 overflow-x-auto">
                      <code>{`// Store definition
const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => 
    set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))`}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'framer-motion' && (
              <motion.div
                key="framer-motion"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-white h-full overflow-y-auto pr-2 custom-scrollbar"
              >
                <div className="flex flex-col items-center gap-6 p-4">
                  <h2 className="text-3xl font-bold text-center flex items-center gap-2">
                    Framer Motion
                  </h2>
                  <p className="text-zinc-300 text-center max-w-2xl mb-4">
                    Framer Motion is a powerful library for animations and
                    transitions in React.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                    <motion.div
                      className="bg-zinc-700/50 p-6 rounded-lg flex flex-col items-center gap-4"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        Basic Animation
                      </h3>
                      <div className="flex justify-center items-center h-32 w-full">
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"
                          animate={{
                            scale: [1, 1.5, 1.5, 1, 1],
                            rotate: [0, 0, 180, 180, 0],
                            borderRadius: ['10%', '10%', '50%', '50%', '10%'],
                          }}
                          transition={{
                            duration: 4,
                            ease: 'easeInOut',
                            times: [0, 0.2, 0.5, 0.8, 1],
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      </div>
                      <div className="bg-zinc-800/80 p-3 rounded-lg mt-2 w-full">
                        <pre className="text-xs text-zinc-300 overflow-x-auto">
                          <code>{`<motion.div
  animate={{ 
    scale: [1, 1.5, 1.5, 1, 1],
    rotate: [0, 0, 180, 180, 0],
    borderRadius: ["10%", "50%", "10%"]
  }}
  transition={{ 
    duration: 4,
    repeat: Infinity
  }}
/>`}</code>
                        </pre>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-zinc-700/50 p-6 rounded-lg flex flex-col items-center gap-4"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <h3 className="text-xl font-semibold mb-2">Gestures</h3>
                      <div className="flex justify-center items-center h-32 w-full">
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-lg"
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          whileTap={{
                            scale: 0.8,
                            rotate: -90,
                            borderRadius: '100%',
                          }}
                          drag
                          dragConstraints={{
                            left: -50,
                            right: 50,
                            top: -50,
                            bottom: 50,
                          }}
                        />
                      </div>
                      <p className="text-sm text-zinc-300 text-center">
                        Drag, click, or hover
                      </p>
                      <div className="bg-zinc-800/80 p-3 rounded-lg mt-2 w-full">
                        <pre className="text-xs text-zinc-300 overflow-x-auto">
                          <code>{`<motion.div
  whileHover={{ scale: 1.2, rotate: 90 }}
  whileTap={{ scale: 0.8, rotate: -90 }}
  drag
  dragConstraints={{ left: -50, right: 50 }}
/>`}</code>
                        </pre>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'react-hook-form' && (
              <motion.div
                key="react-hook-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-white h-full overflow-y-auto pr-2 custom-scrollbar"
              >
                <div className="flex flex-col items-center gap-6 p-4">
                  <h2 className="text-3xl font-bold text-center flex items-center gap-2">
                    React Hook Form + Zod
                  </h2>
                  <p className="text-zinc-300 text-center max-w-2xl mb-4">
                    React Hook Form with Zod validation for efficient and typed
                    forms.
                  </p>

                  <motion.div
                    className="bg-zinc-700/50 p-6 rounded-lg w-full max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-white font-medium"
                        >
                          Name
                        </label>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <input
                            {...register('name')}
                            id="name"
                            type="text"
                            className="w-full px-4 py-2 rounded-lg bg-zinc-800/80 text-white border border-zinc-700 focus:border-blue-500 focus:outline-none transition-all duration-200"
                            placeholder="Your name"
                          />
                        </motion.div>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {errors.name.message}
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-white font-medium"
                        >
                          Email
                        </label>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <input
                            {...register('email')}
                            id="email"
                            type="email"
                            className="w-full px-4 py-2 rounded-lg bg-zinc-800/80 text-white border border-zinc-700 focus:border-blue-500 focus:outline-none transition-all duration-200"
                            placeholder="your@email.com"
                          />
                        </motion.div>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium mt-4 hover:opacity-90 transition-opacity"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Submit Form
                      </motion.button>
                    </form>
                  </motion.div>

                  <div className="bg-zinc-800/80 p-4 rounded-lg mt-4 w-full max-w-md">
                    <pre className="text-sm text-zinc-300 overflow-x-auto">
                      <code>{`// Validation with Zod
const formSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
})

// React Hook Form with Zod
const { register, handleSubmit, errors } = 
  useForm<FormData>({
    resolver: zodResolver(formSchema),
  })`}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'react-query' && (
              <motion.div
                key="react-query"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-white h-full overflow-y-auto pr-2 custom-scrollbar"
              >
                <div className="flex flex-col items-center gap-6 p-4">
                  <h2 className="text-3xl font-bold text-center flex items-center gap-2">
                    TanStack Query
                  </h2>
                  <p className="text-zinc-300 text-center max-w-2xl mb-4">
                    TanStack Query for server state management and data caching.
                  </p>

                  <motion.div
                    className="bg-zinc-700/50 p-6 rounded-lg flex flex-col items-center gap-4 w-full max-w-md"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-full text-center">
                      <h3 className="text-xl font-semibold mb-4">
                        Request Demonstration
                      </h3>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-4"
                        >
                          <p>{error.message}</p>
                        </motion.div>
                      )}

                      <motion.button
                        onClick={() => getUser()}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Loading...
                          </span>
                        ) : (
                          'Make Request'
                        )}
                      </motion.button>
                    </div>
                  </motion.div>

                  <div className="bg-zinc-800/80 p-4 rounded-lg mt-4 w-full max-w-md">
                    <pre className="text-sm text-zinc-300 overflow-x-auto">
                      <code>{`// Custom hook with TanStack Query
export const useGetUser = () => {
  const queryClient = useQueryClient()
  
  const { mutate, isPending, error } = 
    useMutation({
      mutationFn: fetchUser,
      onSuccess: (data) => {
        queryClient.setQueryData(
          ['user'], data
        )
      }
    })
    
  return {
    getUser: mutate,
    isLoading: isPending,
    error
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Documentation Tab Content */}
            {activeTab === 'documentation' && (
              <motion.div
                key="documentation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-white h-full overflow-y-auto pr-2 custom-scrollbar"
              >
                <div className="flex flex-col items-center gap-6 p-4">
                  <h2 className="text-3xl font-bold text-center flex items-center gap-2">
                    Documentation Links
                  </h2>
                  <p className="text-zinc-300 text-center max-w-2xl mb-4">
                    Official documentation for all the tools and libraries used
                    in this boilerplate.
                  </p>

                  <motion.div
                    className="bg-zinc-700/50 p-6 rounded-lg w-full max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Wrench weight="duotone" size={24} />
                          Development Tools
                        </h3>
                        <ul className="space-y-3">
                          <li>
                            <a
                              href="https://vitejs.dev/guide/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <Lightning size={18} weight="duotone" />
                              Vite Documentation
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.typescriptlang.org/docs/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <FileTs size={18} weight="duotone" />
                              TypeScript Documentation
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://eslint.org/docs/user-guide/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <BracketsCurly size={18} weight="duotone" />
                              ESLint Documentation
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://prettier.io/docs/en/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <Sparkle size={18} weight="duotone" />
                              Prettier Documentation
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://typicode.github.io/husky/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <Shield size={18} weight="duotone" />
                              Husky Documentation
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://commitlint.js.org/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <GitCommit size={18} weight="duotone" />
                              Commitlint Documentation
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Database weight="duotone" size={24} />
                          State Management
                        </h3>
                        <ul className="space-y-3">
                          <li>
                            <a
                              href="https://github.com/pmndrs/zustand"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <Database size={18} weight="duotone" />
                              Zustand Documentation
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Sparkle weight="duotone" size={24} />
                          UI and Animation
                        </h3>
                        <ul className="space-y-3">
                          <li>
                            <a
                              href="https://www.framer.com/motion/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <Sparkle size={18} weight="duotone" />
                              Framer Motion Documentation
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://v3.tailwindcss.com/docs/installation"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <PaintBucket size={18} weight="duotone" />
                              Tailwind CSS3 Documentation
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <FileCode weight="duotone" size={24} />
                          Forms and Validation
                        </h3>
                        <ul className="space-y-3">
                          <li>
                            <a
                              href="https://react-hook-form.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <FileCode size={18} weight="duotone" />
                              React Hook Form Documentation
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://zod.dev/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <FileCode size={18} weight="duotone" />
                              Zod Documentation
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Atom weight="duotone" size={24} />
                          Data Fetching
                        </h3>
                        <ul className="space-y-3">
                          <li>
                            <a
                              href="https://tanstack.com/query/latest"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <Atom size={18} weight="duotone" />
                              TanStack Query Documentation
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Book weight="duotone" size={24} />
                          Additional Resources
                        </h3>
                        <ul className="space-y-3">
                          <li>
                            <a
                              href="https://react.dev/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <Book size={18} weight="duotone" />
                              React Documentation
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://phosphoricons.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <Link size={18} weight="duotone" />
                              Phosphor Icons
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://reactrouter.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                            >
                              <Link size={18} weight="duotone" />
                              React Router DOM
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        className="text-center text-zinc-400 text-sm mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>
          Developed by{' '}
          <a
            href="https://github.com/leticiaalexandre"
            className="text-white hover:text-gray-500 transition-colors ease-in-out duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Letícia Alexandre
          </a>
        </p>
      </motion.div>
    </div>
  )
}
