<template>
  <q-expansion-item v-if="children && children.length > 0"
      :icon="icon"
      :label="title"
      :caption="caption"
      expand-separator
      dense-toggle
    >
    <q-list>
        <q-item v-for="c in children"
          :key="c.title"
          clickable
          tag="a"
          :href="c.link"
          class="text-primary"
          :active="c.link == '/#'"
        >
          <q-item-section avatar></q-item-section>
          <q-item-section>
            <q-item-label>{{ c.title }}</q-item-label>
            <q-item-label caption>
              {{ c.caption }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
  </q-expansion-item>
  <q-item v-else
    clickable
    tag="a"
    :href="link"
    class="text-primary"
    :active="link == '/#'"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    children: {
      type: Array
    }
  }
}
</script>
