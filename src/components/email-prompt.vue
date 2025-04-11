<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import backgroundImg from '@/assets/img/startscreen-bg.jpeg'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'

const emit = defineEmits(['userDataSubmit'])
const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    email: z.string().email('Invalid email address'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
  emit('userDataSubmit', values)
})
</script>

<template>
  <div
    class="h-full bg-cover flex flex-col justify-center items-center"
    :style="{ backgroundImage: `url(${backgroundImg})` }"
  >
    <h2 class="text-5xl font-bold text-muted-foreground my-8 text-center">
      Are you ready to see your results?
    </h2>
    <Card class="w-full max-w-md">
      <CardHeader></CardHeader>
      <CardTitle class="text-center">Enter your details to see your exclusive offer!</CardTitle>
      <!-- <CardDescription class="text-muted-foreground text-center">
        We will send you the results via email.
      </CardDescription> -->
      <CardContent>
        <form @submit="onSubmit" class="p-4 w-full flex flex-col gap-6">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel class="text-muted-foreground">Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Your name" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel class="text-muted-foreground">Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="user@example.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit"> Submit </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
