import { A, Code, H1, H2, Layout, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Remembering state',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#saving-local-state', name: 'Saving local state' },
    { url: '#multiple-components', name: 'Multiple components' },
    { url: '#form-helper', name: 'Form helper' },
    { url: '#manually-saving-state', name: 'Manually saving state' },
  ],
}

export default function () {
  return (
    <>
      <H1>Remembering state</H1>
      <P>
        When navigating browser history, Inertia restores pages using prop data cached in history state. However,
        Inertia does not restore local page component state since this is beyond its reach. This can lead to outdated
        pages in your browser history.
      </P>
      <P>
        For example, if a user partially completes a form, then navigates away, and then returns back, the form will be
        reset and their work will be lost.
      </P>
      <P>To mitigate this issue, you can tell Inertia which local component state to save in the browser history.</P>
      <H2>Saving local state</H2>
      <P>
        To save local component state to the history state, use the <Code>remember</Code> feature to tell Inertia which
        data it should remember.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            description: 'Use the "remember" property to tell Inertia which data it should remember.',
            language: 'js',
            code: dedent`
              {
                // Option 1: Object...
                remember: {
                  data: ['form'],
                },

                // Option 2: Array...
                remember: ['form'],

                // Option 3: String...
                remember: 'form',

                data() {
                  return {
                    form: {
                      first_name: null,
                      last_name: null,
                      // ...
                    },
                  }
                },
              }
            `,
          },
          {
            name: 'Vue 3',
            description: 'Use the "useRemember" hook to tell Inertia which data it should remember.',
            language: 'js',
            code: dedent`
              import { useRemember } from '@inertiajs/vue3'

              export default {
                setup() {
                  const form = useRemember({
                      first_name: null,
                      last_name: null,
                  })

                  return { form }
                },
              }
            `,
          },
          {
            name: 'React',
            description: 'Use the "useRemember" hook to tell Inertia which data it should remember.',
            language: 'jsx',
            code: dedent`
              import { useRemember } from '@inertiajs/react'

              export default function Profile() {
                const [formState, setFormState] = useRemember({
                  first_name: null,
                  last_name: null,
                  // ...
                })

                // ...
              }
            `,
          },
          {
            name: 'Svelte',
            description: 'Use the "remember" store to tell Inertia which data it should remember.',
            language: 'js',
            code: dedent`
              import { remember } from '@inertiajs/svelte'

              let form = remember({
                first_name: null,
                last_name: null,
              })

              // ...
            `,
          },
        ]}
      />
      <P>
        Now, whenever your local <Code>form</Code> state changes, Inertia will automatically save this data to the
        history state and will also restore it on history navigation.
      </P>
      <H2>Multiple components</H2>
      <P>
        If your page contains multiple components that use the remember functionality provided by Inertia, you need to
        provide a unique key for each component so that Inertia knows which data to restore to each component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            description: 'Set a key using the "remember.key" property.',
            language: 'js',
            code: dedent`
              {
                remember: {
                  data: ['form'],
                  key: 'Users/Create',
                },
                data() {
                  return {
                    form: {
                      first_name: null,
                      last_name: null,
                    },
                  }
                },
              }
            `,
          },
          {
            name: 'Vue 3',
            description: 'Set a key as the second argument of useRemember().',
            language: 'js',
            code: dedent`
              import { useRemember } from '@inertiajs/vue3'

              export default {
                setup() {
                  const form = useRemember({
                      first_name: null,
                      last_name: null,
                  }, 'Users/Create')

                  return { form }
                },
              }
            `,
          },
          {
            name: 'React',
            description: 'Set a key as the second argument of useRemember().',
            language: 'jsx',
            code: dedent`
              import { useRemember } from '@inertiajs/react'

              export default function Profile() {
                const [formState, setFormState] = useRemember({
                  first_name: null,
                  last_name: null,
                }, 'Users/Create')

              }
            `,
          },
          {
            name: 'Svelte',
            description: 'Set a key as the second argument of useRemember().',
            language: 'js',
            code: dedent`
                import { page, remember } from '@inertiajs/svelte'

                let form = remember({
                  first_name: null,
                  last_name: null,
                }, 'Users/Create')

            `,
          },
        ]}
      />
      <P>
        If you have multiple instances of the same component on the page using the remember functionality, be sure to
        also include a unique key for each component instance, such as a model identifier.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            description: 'Set a key callback using the "remember.key" property.',
            language: 'js',
            code: dedent`
              {
                remember: {
                  data: ['form'],
                  key() {
                    return \`Users/Edit:\${this.user.id}\`
                  }
                },
                data() {
                  return {
                    form: {
                      first_name: this.user.first_name,
                      last_name: this.user.last_name,
                    },
                  }
                },
              }
            `,
          },
          {
            name: 'Vue 3',
            description: 'Set a dynamic key as the second argument of useRemember().',
            language: 'js',
            code: dedent`
              import { useRemember } from '@inertiajs/vue3'

              export default {
                setup({ user }) {
                  const form = useRemember({
                      first_name: null,
                      last_name: null,
                  }, \`Users/Edit:\${user.id}\`)

                  return { form }
                },
              }
            `,
          },
          {
            name: 'React',
            description: 'Set a dynamic key as the second argument of useRemember().',
            language: 'jsx',
            code: dedent`
              import { useRemember } from '@inertiajs/react'

              export default function Profile() {
                const [formState, setFormState] = useRemember({
                  first_name: props.user.first_name,
                  last_name: props.user.last_name,
                }, \`Users/Edit:\${this.user.id}\`)
              }
            `,
          },
          {
            name: 'Svelte',
            description: 'Set a dynamic key as the second argument of useRemember().',
            language: 'js',
            code: dedent`
                import { page, remember } from '@inertiajs/svelte'

                let form = remember({
                  first_name: $page.props.user.first_name,
                  last_name: $page.props.user.last_name,
                }, \`Users/Edit:\${$page.props.user.id}\`)
            `,
          },
        ]}
      />
      <H2>Form helper</H2>
      <P>
        If you're using the <A href="/forms#form-helper">Inertia form helper</A>, you can pass a unique form key as the
        first argument when instantiating your form. This will cause the form data and errors to automatically be
        remembered.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/vue2'

              form: useForm('CreateUser', data)
              form: useForm(\`EditUser:\${this.user.id}\`, data)
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/vue3'

              const form = useForm('CreateUser', data)
              const form = useForm(\`EditUser:\${user.id}\`, data)
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/react'

              const form = useForm('CreateUser', data)
              const form = useForm(\`EditUser:\${user.id}\`, data)
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/svelte'

              const form = useForm('CreateUser', data)
              const form = useForm(\`EditUser:\${user.id}\`, data)
            `,
          },
        ]}
      />
      <H2>Manually saving state</H2>
      <P>
        The <Code>remember</Code> property in Vue 2, and the <Code>useRemember</Code> hook in Vue 3, React, and Svelte
        all watch for data changes and automatically save those changes to the history state. Then, Inertia will restore
        the data on page load.
      </P>
      <P>
        However, it's possible to also manage this manually using the underlying <Code>remember()</Code> and{' '}
        <Code>restore()</Code> methods in Inertia.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue2'

              // Save local component state to history state...
              router.remember(data, 'my-key')

              // Restore local component state from history state...
              let data = router.restore('my-key')
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              // Save local component state to history state...
              router.remember(data, 'my-key')

              // Restore local component state from history state...
              let data = router.restore('my-key')
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              // Save local component state to history state...
              router.remember(data, 'my-key')

              // Restore local component state from history state...
              let data = router.restore('my-key')
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              // Save local component state to history state...
              router.remember(data, 'my-key')

              // Restore local component state from history state...
              let data = router.restore('my-key')
            `,
          },
        ]}
      />
    </>
  )
}
